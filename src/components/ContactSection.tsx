import { MessageCircle, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const whatsappNumber = "+913335537458";
  const whatsappMessage = encodeURIComponent("Hi! I'd like to place an order at SnaFeechicks.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const phoneNumber = "+913335537458";

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Get In Touch
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ready to <span className="text-gradient">Order</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Just a tap away from deliciousness. Order on WhatsApp or visit us!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-warm text-primary-foreground hover:opacity-90 shadow-warm text-lg px-10 py-7 rounded-full font-semibold"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-6 w-6" />
              Order on WhatsApp
            </a>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-10 py-7 rounded-full"
          >
            <a href={`tel:${phoneNumber}`}>
              <Phone className="mr-2 h-5 w-5" />
              Call to Order
            </a>
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-card rounded-2xl text-center border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Visit Our Café</h3>
            <p className="text-sm text-muted-foreground">
              Located nearby, right in your neighborhood!
            </p>
          </div>

          <div className="p-6 bg-card rounded-2xl text-center border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Opening Hours</h3>
            <p className="text-sm text-muted-foreground">
              Mon - Sun: 11:00 AM - 11:00 PM
            </p>
          </div>

          <div className="p-6 bg-card rounded-2xl text-center border border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-muted-foreground">
              +91 33 3553 7458
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-14 rounded-2xl overflow-hidden border border-border/50 bg-card h-64 md:h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
            <p className="text-muted-foreground">
              📍 Google Maps integration ready
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Add your café location here
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">Follow us for updates & offers</p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-foreground" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
