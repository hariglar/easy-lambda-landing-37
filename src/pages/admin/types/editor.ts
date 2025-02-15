export interface TemplateContent {
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
  categories: Array<{
    name: string;
    image: string;
    itemCount: number;
  }>;
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
  };
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
    placeholderText: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
  }>;
  brands: Array<{
    name: string;
    logo: string;
  }>;
  collections: Array<{
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  promotion: {
    code: string;
    discount: string;
    expiry: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export const defaultContent: TemplateContent = {
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
  categories: [
    { name: "Women's Fashion", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop", itemCount: 1250 },
    { name: "Men's Collection", image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=400&fit=crop", itemCount: 890 },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", itemCount: 432 }
  ],
  products: Object.assign([
    {
      name: "Premium Watch",
      price: "$299",
      rating: 4.8,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      discount: "15% OFF",
      badge: "New"
    },
    {
      name: "Designer Handbag",
      price: "$199",
      rating: 4.9,
      buttonText: "Add to Cart",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      discount: "20% OFF"
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
  },
  benefits: [
    { title: "Premium Quality", description: "Handcrafted with the finest materials", icon: "award" },
    { title: "Expert Support", description: "24/7 dedicated customer service", icon: "headphones" },
    { title: "Worldwide Shipping", description: "Fast delivery to your doorstep", icon: "truck" }
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "The quality of their products is exceptional. I'm always impressed with their attention to detail.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Style Consultant",
      content: "A game-changer in luxury fashion. Their collection is both timeless and trendy.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4.8
    }
  ],
  brands: [
    { name: "LuxBrand", logo: "https://placehold.co/200x80/ffffff/000000.png?text=LuxBrand" },
    { name: "Elegance", logo: "https://placehold.co/200x80/ffffff/000000.png?text=Elegance" },
    { name: "Premium", logo: "https://placehold.co/200x80/ffffff/000000.png?text=Premium" }
  ],
  collections: [
    {
      title: "Summer Collection",
      description: "Light and breezy pieces for the perfect summer look",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=400&fit=crop",
      link: "/summer"
    },
    {
      title: "Winter Essentials",
      description: "Stay warm and stylish with our winter collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop",
      link: "/winter"
    }
  ],
  faqs: [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days."
    }
  ],
  cta: {
    title: "Special Holiday Collection",
    description: "Discover our exclusive holiday pieces before they're gone",
    buttonText: "Shop Collection",
    backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop"
  },
  stats: [
    { value: "150K+", label: "Happy Customers" },
    { value: "10K+", label: "Products" },
    { value: "50+", label: "Countries" }
  ],
  promotion: {
    code: "SUMMER2024",
    discount: "25% OFF",
    expiry: "Limited time offer"
  },
  meta: {
    title: "",
    description: ""
  }
};
