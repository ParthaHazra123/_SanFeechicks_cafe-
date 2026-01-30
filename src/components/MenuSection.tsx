import kebabImg from "@/assets/kebab.jpg";
import fingerFoodsImg from "@/assets/finger-foods.jpg";
import soupImg from "@/assets/soup.jpg";
import saladImg from "@/assets/salad.jpg";
import lassiImg from "@/assets/lassi.jpg";

interface MenuCategory {
  name: string;
  image: string;
  items: string[];
  highlight?: boolean;
}

const menuCategories: MenuCategory[] = [
  {
    name: "Grilled Items",
    image: kebabImg,
    items: ["Chicken Tikka", "Tandoori Wings", "Grilled Seekh", "Fish Tikka"],
    highlight: true,
  },
  {
    name: "Kababs",
    image: kebabImg,
    items: ["Seekh Kabab", "Shami Kabab", "Reshmi Kabab", "Malai Kabab"],
    highlight: true,
  },
  {
    name: "Finger Foods",
    image: fingerFoodsImg,
    items: ["Chicken Lollipop", "Crispy Wings", "Fish Fingers", "Cheese Balls"],
  },
  {
    name: "Soups",
    image: soupImg,
    items: ["Hot & Sour", "Cream of Tomato", "Sweet Corn", "Manchow"],
  },
  {
    name: "Salads",
    image: saladImg,
    items: ["Garden Fresh", "Chicken Caesar", "Greek Salad", "Coleslaw"],
  },
  {
    name: "Starters & Rolls",
    image: fingerFoodsImg,
    items: ["Paneer Tikka", "Veg Spring Roll", "Chicken Roll", "Egg Roll"],
  },
  {
    name: "Gravy Sides",
    image: soupImg,
    items: ["Butter Chicken", "Kadhai Paneer", "Dal Makhani", "Mix Veg"],
  },
  {
    name: "Flavored Lassis",
    image: lassiImg,
    items: ["Mango Lassi", "Rose Lassi", "Sweet Lassi", "Salted Lassi"],
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-background relative">
      <div className="container px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
            What We Serve
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Menu</span> Highlights
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From sizzling kebabs to refreshing lassis – explore our handpicked favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-warm ${
                category.highlight ? "ring-2 ring-primary/30" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {category.highlight && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-gradient-warm text-primary-foreground rounded-full">
                    Popular 🔥
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {category.name}
                </h3>
                
                <ul className="space-y-1.5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 text-sm">
          📋 Full menu available at our café • Prices may vary
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
