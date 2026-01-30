import { Flame, Heart, Clock } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Our Story
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-gradient">SnaFeechicks</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Born from a love for authentic flavors and quick bites, SnaFeechicks is your go-to 
            neighborhood café. We believe great food doesn't have to be complicated – it just 
            has to be fresh, flavorful, and made with heart. Whether you're grabbing a quick 
            snack or hanging out with friends, we've got something delicious waiting for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Flame className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Fresh Off the Grill</h3>
              <p className="text-muted-foreground text-sm">
                Every order is prepared fresh with premium ingredients
              </p>
            </div>

            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground text-sm">
                Family recipes passed down with a modern twist
              </p>
            </div>

            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-muted-foreground text-sm">
                Fast prep time without compromising on quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
