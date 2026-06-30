export const heroSlides = [
  {
    id: 1,
    tag: '🌿 Natural & Organic',
    title: 'Health is Your',
    titleAccent: 'Greatest Wealth',
    description:
      "Discover premium health & wellness products crafted with nature's best ingredients for you and your family.",
    primaryCta: { label: 'Shop Now', href: '#products' },
    secondaryCta: { label: 'Join Network', href: '/login' },
    icon: 'fa-leaf',
    gradient: 'linear-gradient(135deg, #1D6435 0%, #2d8a4e 50%, #81CE29 100%)',
  },
  {
    id: 2,
    tag: '💰 MLM Opportunity',
    title: 'Earn While You',
    titleAccent: 'Build Health',
    description:
      'Join thousands of successful distributors building financial freedom through our proven MLM network.',
    primaryCta: { label: 'Start Earning', href: '/login' },
    secondaryCta: { label: 'Learn More', href: '#about' },
    icon: 'fa-hand-holding-dollar',
    gradient: 'linear-gradient(135deg, #b45309 0%, #f38b2d 50%, #f5c842 100%)',
  },
  {
    id: 3,
    tag: '🏆 Award Winning',
    title: 'Trusted by',
    titleAccent: '50,000+ Families',
    description:
      'Award-winning health solutions trusted by over 50,000 happy customers across India.',
    primaryCta: { label: 'See Reviews', href: '#testimonials' },
    secondaryCta: { label: 'Browse Products', href: '#products' },
    icon: 'fa-trophy',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #60a5fa 100%)',
  },
];

export const categories = [
  { emoji: '💊', label: 'Supplements', gradient: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)' },
  { emoji: '🌸', label: 'Skincare', gradient: 'linear-gradient(135deg,#fce4ec,#f8bbd0)' },
  { emoji: '🥤', label: 'Nutrition', gradient: 'linear-gradient(135deg,#fff3e0,#ffe0b2)' },
  { emoji: '💧', label: 'Immunity', gradient: 'linear-gradient(135deg,#e3f2fd,#bbdefb)' },
  { emoji: '🧴', label: 'Personal Care', gradient: 'linear-gradient(135deg,#f3e5f5,#e1bee7)' },
  { emoji: '🏋️', label: 'Fitness', gradient: 'linear-gradient(135deg,#e8eaf6,#c5cae9)' },
];

export interface Product {
  id: number;
  emoji: string;
  category: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  discount: string;
  gradient: string;
}

export const products: Product[] = [
  {
    id: 1,
    emoji: '🌿',
    category: 'Supplements',
    name: 'Aurra Immunity Booster Capsules',
    rating: 5,
    reviews: 248,
    price: 599,
    oldPrice: 749,
    discount: '20% OFF',
    gradient: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)',
  },
  {
    id: 2,
    emoji: '🌸',
    category: 'Skincare',
    name: 'Glow Face Serum with Vitamin C',
    rating: 4,
    reviews: 182,
    price: 849,
    oldPrice: 999,
    discount: '15% OFF',
    gradient: 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
  },
  {
    id: 3,
    emoji: '🥤',
    category: 'Nutrition',
    name: 'Protein Shake – Chocolate 500g',
    rating: 5,
    reviews: 316,
    price: 1249,
    oldPrice: 1649,
    discount: '25% OFF',
    gradient: 'linear-gradient(135deg,#fff3e0,#ffe0b2)',
  },
  {
    id: 4,
    emoji: '💧',
    category: 'Immunity',
    name: 'AHK Immunity Drops – Kids Formula',
    rating: 5,
    reviews: 524,
    price: 449,
    oldPrice: 649,
    discount: '30% OFF',
    gradient: 'linear-gradient(135deg,#e3f2fd,#bbdefb)',
  },
];

export const stats = [
  { emoji: '👥', value: 50000, suffix: '+', label: 'Happy Customers' },
  { emoji: '📦', value: 200, suffix: '+', label: 'Products Available' },
  { emoji: '🏪', value: 5000, suffix: '+', label: 'Distributors' },
  { emoji: '🌍', value: 28, suffix: '', label: 'States Covered' },
];

export const testimonials = [
  {
    id: 1,
    text: '"I joined Aurra Health Kart 8 months ago and within 3 months I was earning enough to quit my job. The products actually work and sell themselves!"',
    name: 'Priya Sharma',
    role: 'Gold Distributor, Delhi',
    avatar: '👩',
    gradient: 'linear-gradient(135deg,#1D6435,#81CE29)',
  },
  {
    id: 2,
    text: '"The Immunity Booster literally saved my family during the pandemic. Now I recommend these products to everyone I know. Quality is unmatched."',
    name: 'Rajesh Kumar',
    role: 'Diamond Member, Mumbai',
    avatar: '👨',
    gradient: 'linear-gradient(135deg,#f38b2d,#f5c842)',
  },
  {
    id: 3,
    text: '"Best decision I made was becoming a distributor. The compensation plan is transparent and the product quality keeps customers coming back."',
    name: 'Anita Verma',
    role: 'Platinum Distributor, Pune',
    avatar: '👩‍💼',
    gradient: 'linear-gradient(135deg,#2563eb,#60a5fa)',
  },
];
