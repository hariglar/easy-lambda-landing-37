
export interface TemplateContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
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
  }>;
  newsletter: {
    title: string;
    description: string;
  };
}

export const defaultContent: TemplateContent = {
  hero: {
    title: "Discover Luxury Fashion",
    subtitle: "Explore our curated collection of premium fashion and accessories",
    ctaText: "Shop Now",
    backgroundImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop"
  },
  features: [
    { title: "Free Shipping", description: "On orders over $50" },
    { title: "Easy Returns", description: "30-day return policy" },
    { title: "Secure Payments", description: "100% secure checkout" }
  ],
  products: [
    {
      name: "Premium Watch",
      price: "$299",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      name: "Designer Handbag",
      price: "$199",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
    },
    {
      name: "Wireless Earbuds",
      price: "$159",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop"
    }
  ],
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get exclusive offers and be the first to know about new arrivals"
  }
};
