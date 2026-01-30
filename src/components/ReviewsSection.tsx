import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, User, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

const ReviewsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    const { data: reviewsData, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
      return;
    }

    // Fetch profiles for each review
    if (reviewsData && reviewsData.length > 0) {
      const userIds = [...new Set(reviewsData.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profilesMap = new Map(
        profilesData?.map(p => [p.user_id, { display_name: p.display_name, avatar_url: p.avatar_url }]) || []
      );

      const reviewsWithProfiles = reviewsData.map(review => ({
        ...review,
        profiles: profilesMap.get(review.user_id) || null,
      }));

      setReviews(reviewsWithProfiles);
    } else {
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel("reviews-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to leave a review.",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write your review before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      rating,
      comment: comment.trim(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your review has been submitted.",
      });
      setComment("");
      setRating(5);
    }

    setSubmitting(false);
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
          >
            <Star
              className={`h-5 w-5 ${
                star <= (interactive ? hoverRating || rating : count)
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <section id="reviews" className="py-20 bg-secondary/30 relative">
      <div className="container px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Customer Love
          </span>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>

          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(Number(averageRating))
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mb-14">
          {user ? (
            <form onSubmit={handleSubmitReview} className="bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="font-semibold text-lg mb-4">Share Your Experience</h3>

              <div className="mb-4">
                <label className="block text-sm text-muted-foreground mb-2">Your Rating</label>
                {renderStars(rating, true)}
              </div>

              <Textarea
                placeholder="Tell us about your experience at SnaFeechicks..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4 min-h-[100px]"
                maxLength={500}
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{comment.length}/500 characters</span>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-warm text-primary-foreground hover:opacity-90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
              <p className="text-muted-foreground mb-4">
                Want to share your experience? Login to leave a review!
              </p>
              <Button asChild className="bg-gradient-warm text-primary-foreground hover:opacity-90">
                <a href="/auth">Login to Review</a>
              </Button>
            </div>
          )}
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card rounded-2xl p-6 border border-border/50 transition-all hover:shadow-card"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {review.profiles?.avatar_url ? (
                      <img
                        src={review.profiles.avatar_url}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {review.profiles?.display_name || "Food Lover"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {renderStars(review.rating)}

                <p className="mt-3 text-foreground/90 line-clamp-4">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
