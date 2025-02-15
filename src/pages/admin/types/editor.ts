
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
    rating: number;
    image: string;
  }>;
  newsletter: {
    title: string;
    description: string;
  };
  sectionOrder?: string[];
}

export const defaultContent: TemplateContent = {
  hero: {
    title: "Welcome to Our Store",
    subtitle: "Discover amazing products at great prices",
    ctaText: "Shop Now",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop"
  },
  features: [
    {
      title: "Fast Shipping",
      description: "Get your items delivered quickly"
    },
    {
      title: "24/7 Support",
      description: "We're here to help anytime"
    },
    {
      title: "Best Prices",
      description: "Competitive prices on all items"
    }
  ],
  products: [
    {
      name: "Premium Product",
      price: "$99.99",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      name: "Quality Item",
      price: "$79.99",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
    },
    {
      name: "Amazing Product",
      price: "$149.99",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop"
    }
  ],
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get updates on new products and special offers"
  },
  sectionOrder: ['hero', 'features', 'products', 'newsletter']
}
