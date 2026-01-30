import { MessageCircle } from "lucide-react";

const StickyWhatsApp = () => {
  const whatsappNumber = "+913335537458";
  const whatsappMessage = encodeURIComponent("Hi! I'd like to place an order at SnaFeechicks.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-warm text-primary-foreground px-5 py-4 rounded-full shadow-warm hover:scale-105 transition-transform duration-200 font-semibold md:hidden"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span>Order Now</span>
    </a>
  );
};

export default StickyWhatsApp;
