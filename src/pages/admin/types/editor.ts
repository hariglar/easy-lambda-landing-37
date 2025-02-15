export interface TemplateContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    lookbookText: string;
    backgroundImage: string;
    visible?: boolean;
  };
  features: Array<{
    title: string;
    description: string;
  }> & { visible?: boolean };
  categories: Array<{
    name: string;
    image: string;
    itemCount: number;
  }> & { visible?: boolean };
  products: Array<{
    name: string;
    price: string;
    image: string;
    rating: number;
    buttonText: string;
    discount?: string;
    badge?: string;
  }> & {
    sectionTitle: string;
    visible?: boolean;
  };
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
    placeholderText: string;
    visible?: boolean;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }> & { visible?: boolean };
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
  }> & { visible?: boolean };
  brands: Array<{
    name: string;
    logo: string;
  }> & { visible?: boolean };
  collections: Array<{
    title: string;
    description: string;
    image: string;
    link: string;
  }> & { visible?: boolean };
  faqs: Array<{
    question: string;
    answer: string;
  }> & { visible?: boolean };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
    visible?: boolean;
  };
  stats: Array<{
    value: string;
    label: string;
  }> & { visible?: boolean };
  promotion: {
    code: string;
    discount: string;
    expiry: string;
    visible?: boolean;
  };
  meta: {
    title: string;
    description: string;
  };
  theme?: {
    primaryColor: string;
    name: string;
  };
}

export const defaultContent: TemplateContent = {
  hero: {
    title: "Discover Luxury Fashion",
    subtitle: "Explore our curated collection of premium fashion and accessories",
    ctaText: "Shop Now",
    lookbookText: "View Lookbook",
    backgroundImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop",
    visible: true
  },
  features: Object.assign([
    { title: "Free Shipping", description: "On orders over $50" },
    { title: "Easy Returns", description: "30-day return policy" },
    { title: "Secure Payments", description: "100% secure checkout" }
  ], { visible: true }),
  categories: [
    { name: "Women's Fashion", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop", itemCount: 1250, visible: true },
    { name: "Men's Collection", image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=400&fit=crop", itemCount: 890, visible: true },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", itemCount: 432, visible: true }
  ],
  products: Object.assign([
    {
      name: "Premium Watch",
      price: "$299",
      rating: 4.8,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      discount: "15% OFF",
      badge: "New",
      visible: true
    },
    {
      name: "Designer Handbag",
      price: "$199",
      rating: 4.9,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      discount: "20% OFF",
      visible: true
    },
    {
      name: "Wireless Earbuds",
      price: "$159",
      rating: 4.7,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      visible: true
    }
  ], { sectionTitle: "Featured Products", visible: true }),
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get exclusive offers and be the first to know about new arrivals",
    buttonText: "Subscribe",
    placeholderText: "Enter your email",
    visible: true
  },
  benefits: [
    { title: "Premium Quality", description: "Handcrafted with the finest materials", icon: "award", visible: true },
    { title: "Expert Support", description: "24/7 dedicated customer service", icon: "headphones", visible: true },
    { title: "Worldwide Shipping", description: "Fast delivery to your doorstep", icon: "truck", visible: true }
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "The quality of their products is exceptional. I'm always impressed with their attention to detail.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      visible: true
    },
    {
      name: "Michael Chen",
      role: "Style Consultant",
      content: "A game-changer in luxury fashion. Their collection is both timeless and trendy.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4.8,
      visible: true
    }
  ],
  brands: [
    { name: "LuxBrand", logo: "https://placehold.co/200x80/ffffff/000000.png?text=LuxBrand", visible: true },
    { name: "Elegance", logo: "https://placehold.co/200x80/ffffff/000000.png?text=Elegance", visible: true },
    { name: "Premium", logo: "https://placehold.co/200x80/ffffff/000000.png?text=Premium", visible: true }
  ],
  collections: [
    {
      title: "Summer Collection",
      description: "Light and breezy pieces for the perfect summer look",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=400&fit=crop",
      link: "/summer",
      visible: true
    },
    {
      title: "Winter Essentials",
      description: "Stay warm and stylish with our winter collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop",
      link: "/winter",
      visible: true
    }
  ],
  faqs: [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging.",
      visible: true
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.",
      visible: true
    }
  ],
  cta: {
    title: "Special Holiday Collection",
    description: "Discover our exclusive holiday pieces before they're gone",
    buttonText: "Shop Collection",
    backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop",
    visible: true
  },
  stats: [
    { value: "150K+", label: "Happy Customers", visible: true },
    { value: "10K+", label: "Products", visible: true },
    { value: "50+", label: "Countries", visible: true }
  ],
  promotion: {
    code: "SUMMER2024",
    discount: "25% OFF",
    expiry: "Limited time offer",
    visible: true
  },
  meta: {
    title: "",
    description: ""
  },
  theme: {
    primaryColor: "#8B5CF6",
    name: "Purple"
  }
};
