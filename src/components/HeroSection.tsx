import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";

const HeroSection = () => {
  const whatsappNumber = "+913335537458";
  const whatsappMessage = encodeURIComponent("Hi! I'd like to place an order at SnaFeechicks.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroFood}
          alt="Delicious grilled food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-20 text-center md:text-left md:max-w-3xl md:mr-auto">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
            🔥 Now Serving Fresh & Hot
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">SnaFeechicks</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-4 font-medium">
            Your Neighborhood Flavor Spot
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
            Sizzling grills, crispy bites, and flavors that make you come back for more. 
            Fresh ingredients, made with love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-warm text-primary-foreground hover:opacity-90 shadow-warm text-lg px-8 py-6 rounded-full font-semibold"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Order on WhatsApp
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 py-6 rounded-full"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full" />
    </section>
  );
};

export default HeroSection;
