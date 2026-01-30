import { Leaf, Wallet, Users, MapPin } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the freshest produce and premium meats daily for authentic taste.",
  },
  {
    icon: Wallet,
    title: "Affordable Prices",
    description: "Great food doesn't have to break the bank. Quality at pocket-friendly rates.",
  },
  {
    icon: Users,
    title: "Perfect for Hangouts",
    description: "Whether solo or with friends, our cozy space is great for every occasion.",
  },
  {
    icon: MapPin,
    title: "Conveniently Located",
    description: "Right in your neighborhood – easy to find, easier to love.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Why Us
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">SnaFeechicks</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just food – it's an experience you'll want to repeat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 bg-secondary/30 rounded-2xl border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-warm group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <h3 className="font-display text-lg font-semibold mb-3">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
