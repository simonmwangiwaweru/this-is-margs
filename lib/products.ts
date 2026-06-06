export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  benefits?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Alkaline Cup",
    description: "Premium stainless steel alkaline water cup. Boosts energy, detoxifies & alkalizes your water, and provides essential minerals for daily wellness.",
    price: 3500,
    category: "Alkaline",
    image: "https://picsum.photos/seed/alkaline-water-cup/400/400",
    badge: "Best Seller",
    rating: 5,
    reviews: 186,
    benefits: ["Boosts Energy", "Detoxifies & Alkalizes", "Rich in Minerals"],
  },
  {
    id: 2,
    name: "Cordyceps Coffee",
    description: "Nature's energy every day. Made with Cordyceps Extract, Premium Coffee & Essential Nutrients. 300g. Boosts energy, enhances focus and supports immunity.",
    price: 3000,
    originalPrice: 4000,
    category: "Coffee & Tea",
    image: "https://picsum.photos/seed/cordyceps-coffee-box/400/400",
    badge: "Save KES 1,000",
    rating: 5,
    reviews: 214,
    benefits: ["Boosts Energy", "Enhances Focus", "Supports Immunity"],
  },
  {
    id: 3,
    name: "Maca Coffee",
    description: "Boost your workout performance naturally. Power up gym sessions with Maca Extract & Premium Coffee. 300g. Enhances energy, stamina and mental focus.",
    price: 3000,
    category: "Coffee & Tea",
    image: "https://picsum.photos/seed/maca-coffee-green/400/400",
    badge: "Top Rated",
    rating: 5,
    reviews: 178,
    benefits: ["Enhances Energy & Stamina", "Improves Mental Focus", "Supports Overall Wellness"],
  },
  {
    id: 4,
    name: "Ginseng Coffee",
    description: "Creamy, smooth & nutty instant coffee enriched with Ginseng Extract. Enhances mental focus and cognitive performance. 300g.",
    price: 3000,
    originalPrice: 3500,
    category: "Coffee & Tea",
    image: "https://picsum.photos/seed/ginseng-coffee-silver/400/400",
    badge: "Save KES 500",
    rating: 4,
    reviews: 143,
    benefits: ["Enhances Mental Focus", "Creamy & Smooth Taste", "Natural Ingredients"],
  },
  {
    id: 5,
    name: "Kuding Tea",
    description: "Premium Kuding herbal tea from Grass International. Purely from nature. Detoxifies the body, lowers blood pressure and supports natural weight management. 99g.",
    price: 2200,
    category: "Coffee & Tea",
    image: "https://picsum.photos/seed/kuding-tea-leaves/400/400",
    rating: 5,
    reviews: 159,
    benefits: ["Detoxifies the Body", "Lowers Blood Pressure", "Supports Weight Loss", "Boosts Immune Function", "Reduces Inflammation"],
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil (60 Softgels)",
    description: "Pure Fish Oil Natural Glycerin softgels. Supercharge your fitness & recovery. 60g softgels by Grass International. Boosts heart, brain and joint health.",
    price: 3000,
    category: "Vitamins",
    image: "https://picsum.photos/seed/omega3-softgels-bottle/400/400",
    badge: "Best Seller",
    rating: 5,
    reviews: 241,
    benefits: ["Heart Health", "Brain Function", "Joint Support", "Fitness Recovery"],
  },
  {
    id: 7,
    name: "Vitamin C Tablets 750mg (100 Tabs)",
    description: "Corn Starch Free, stewed citrus extract 750mg. 100 tablets. Immune support, heart health, bone strength and memory boost. KES 3,500.",
    price: 3500,
    category: "Vitamins",
    image: "https://picsum.photos/seed/vitamin-c-tablets-bottle/400/400",
    badge: "Premium",
    rating: 5,
    reviews: 192,
    benefits: ["Immune Support", "Heart Health", "Bone Strength", "Memory Boost"],
  },
  {
    id: 8,
    name: "Chinese Wolfberry (120g)",
    description: "Purely from nature. Boosts immunity, vision & vitality. Supports healthy brain development, enhances eye health and promotes overall energy & vitality.",
    price: 2200,
    category: "Vitamins",
    image: "https://picsum.photos/seed/wolfberry-goji-jar/400/400",
    rating: 5,
    reviews: 127,
    benefits: ["Healthy Brain Development", "Enhances Eye Health", "Boosts Immune System", "Promotes Energy & Vitality"],
  },
  {
    id: 9,
    name: "Glucosamine & Chondroitin (60 Tabs)",
    description: "Support bone & joint health. Repairs cartilage, strengthens joints and boosts bone density. Glucosamine Chondroitin sulphate. 60g by Grass International.",
    price: 2800,
    category: "Bone & Joint",
    image: "https://picsum.photos/seed/glucosamine-joint-bottle/400/400",
    badge: "Top Rated",
    rating: 5,
    reviews: 163,
    benefits: ["Repairs Cartilage", "Strengthens Joints", "Boosts Bone Density", "Exercise Recovery"],
  },
  {
    id: 10,
    name: "Milk Mineral Salt Tablets (60 Tabs)",
    description: "Strong bones. Strong life. Protects & rebuilds bone cartilage, best natural source of calcium. Prevents bone cracks & joint pain. 60g.",
    price: 2500,
    category: "Bone & Joint",
    image: "https://picsum.photos/seed/milk-mineral-tablets/400/400",
    rating: 5,
    reviews: 138,
    benefits: ["Protects & Rebuilds Bone Cartilage", "Best Natural Calcium Source", "Prevents Bone Cracks & Joint Pain"],
  },
  {
    id: 11,
    name: "Probiotic Milk Tablets (60 Tabs)",
    description: "Probiotic freeze-dried powder. 60g. Boosts your daily wellness — improves digestion, boosts immunity, supports gut health and helps nutrient absorption.",
    price: 2800,
    category: "Gut Health",
    image: "https://picsum.photos/seed/probiotic-milk-purple/400/400",
    badge: "New",
    rating: 5,
    reviews: 94,
    benefits: ["Improves Digestion", "Boosts Immunity", "Supports Gut Health", "Helps Nutrient Absorption"],
  },
  {
    id: 12,
    name: "Aloe Vera Toothpaste",
    description: "Naturally fresh & healthy smile. Whitens teeth, soothes sensitivity and uses 100% natural ingredients. Dentist recommended. 20% OFF.",
    price: 1200,
    originalPrice: 1500,
    category: "Skin & Beauty",
    image: "https://picsum.photos/seed/aloe-vera-toothpaste/400/400",
    badge: "20% OFF",
    rating: 4,
    reviews: 211,
    benefits: ["Whitens Teeth", "Soothes Sensitivity", "100% Natural Ingredients", "Dentist Recommended"],
  },
  {
    id: 13,
    name: "Aloe Vera Beauty Soap",
    description: "Organic Aloe Vera Soap with Rosemary. Polysaccharide Rich. Bioactivity Skincare. Soothing, hydrating, moisturising & cleansing. 120g.",
    price: 1000,
    category: "Skin & Beauty",
    image: "https://picsum.photos/seed/aloe-vera-soap-box/400/400",
    rating: 4,
    reviews: 176,
    benefits: ["Soothing", "Hydrating", "Moisturising", "Cleansing"],
  },
  {
    id: 14,
    name: "Horse Oil Soap",
    description: "Deeply hydrates and softens dry, rough skin. Rich in essential fatty acids that restore the skin barrier. Soothes irritation and supports healing for sensitive skin.",
    price: 1500,
    category: "Skin & Beauty",
    image: "https://picsum.photos/seed/horse-oil-soap-amber/400/400",
    rating: 5,
    reviews: 89,
    benefits: ["Deeply Hydrates & Softens", "Restores Skin Barrier", "Soothes Irritation", "For Sensitive Skin"],
  },
  {
    id: 15,
    name: "100% Virgin Coconut Oil",
    description: "100% Natural, Organic, Cold-Pressed, Virgin, Unrefined, Raw. Deeply nourishes hair, reduces breakage and restores strength & shine. For healthy, beautiful hair.",
    price: 2000,
    category: "Skin & Beauty",
    image: "https://picsum.photos/seed/coconut-oil-bottle/400/400",
    badge: "Pure & Natural",
    rating: 5,
    reviews: 134,
    benefits: ["Deeply Nourishes Hair", "Reduces Breakage", "Restores Strength & Shine", "100% Natural"],
  },
];

export const categories = ["All", "Coffee & Tea", "Vitamins", "Bone & Joint", "Gut Health", "Skin & Beauty", "Alkaline"];

export const featuredProducts = [
  products[0],  // Alkaline Cup
  products[1],  // Cordyceps Coffee
  products[2],  // Maca Coffee
  products[5],  // Omega-3
  products[8],  // Glucosamine & Chondroitin
  products[10], // Probiotic Milk Tablets
];
