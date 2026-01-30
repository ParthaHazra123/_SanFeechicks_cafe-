import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-card border-t border-border/50">
      <div className="container px-4 text-center">
        <p className="font-display text-xl text-gradient font-bold mb-2">
          SnaFeechicks
        </p>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for food lovers
        </p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          © {new Date().getFullYear()} SnaFeechicks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
