
export interface TemplateContent {
  sectionOrder?: string[];
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    lookbookText: string;
    backgroundImage: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  products: Array<{
    name: string;
    price: string;
    image: string;
    rating: number;
    buttonText: string;
  }> & {
    sectionTitle: string;
  };
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
    placeholderText: string;
  };
}

export const defaultContent: TemplateContent = {
  sectionOrder: ['hero', 'features', 'products', 'newsletter'],
  hero: {
    title: "Discover Luxury Fashion",
    subtitle: "Explore our curated collection of premium fashion and accessories",
    ctaText: "Shop Now",
    lookbookText: "View Lookbook",
    backgroundImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop"
  },
  features: [
    { title: "Free Shipping", description: "On orders over $50" },
    { title: "Easy Returns", description: "30-day return policy" },
    { title: "Secure Payments", description: "100% secure checkout" }
  ],
  products: Object.assign([
    {
      name: "Premium Watch",
      price: "$299",
      rating: 4.8,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      name: "Designer Handbag",
      price: "$199",
      rating: 4.9,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
    },
    {
      name: "Wireless Earbuds",
      price: "$159",
      rating: 4.7,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop"
    }
  ], { sectionTitle: "Featured Products" }),
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get exclusive offers and be the first to know about new arrivals",
    buttonText: "Subscribe",
    placeholderText: "Enter your email"
  }
};
