import type { Category, Product, Review, Customer } from '@/types';

export const categories: Category[] = [
  { id: 'c1', name: 'Shoes', slug: 'shoes', image: 'https://images.pexels.com/photos/19166246/pexels-photo-19166246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c2', name: 'Bags', slug: 'bags', image: 'https://images.pexels.com/photos/26736144/pexels-photo-26736144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c3', name: 'Clothing', slug: 'clothing', image: 'https://images.pexels.com/photos/14564843/pexels-photo-14564843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c4', name: 'Belts', slug: 'belts', image: 'https://images.pexels.com/photos/27565821/pexels-photo-27565821.png?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c5', name: 'Wallets', slug: 'wallets', image: 'https://images.pexels.com/photos/12495669/pexels-photo-12495669.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c6', name: 'Caps', slug: 'caps', image: 'https://images.pexels.com/photos/10156412/pexels-photo-10156412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c7', name: 'Glasses', slug: 'glasses', image: 'https://images.pexels.com/photos/13909956/pexels-photo-13909956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c8', name: 'Lifestyle', slug: 'lifestyle', image: 'https://images.pexels.com/photos/34976481/pexels-photo-34976481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c9', name: 'Panjabi', slug: 'panjabi', image: 'https://images.pexels.com/photos/14768019/pexels-photo-14768019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c10', name: 'New Arrivals', slug: 'new-arrivals', image: 'https://images.pexels.com/photos/39190712/pexels-photo-39190712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'c11', name: 'Stock Clearance', slug: 'stock-clearance', image: 'https://images.pexels.com/photos/7987589/pexels-photo-7987589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

const commonColors = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Brown', hex: '#6b4423' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'White', hex: '#f0f0f0' },
  { name: 'Olive', hex: '#5e6e3e' },
  { name: 'Tan', hex: '#c4a062' },
];

const shoeSizes = ['40', '41', '42', '43', '44', '45'];
const clothingSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const oneSize = ['One Size'];

const shoeImages = [
  'https://images.pexels.com/photos/19166246/pexels-photo-19166246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31844638/pexels-photo-31844638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31844640/pexels-photo-31844640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31844637/pexels-photo-31844637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10259873/pexels-photo-10259873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19166244/pexels-photo-19166244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19166245/pexels-photo-19166245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const bagImages = [
  'https://images.pexels.com/photos/26736144/pexels-photo-26736144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174573/pexels-photo-27174573.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27204287/pexels-photo-27204287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046143/pexels-photo-27046143.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26736140/pexels-photo-26736140.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27100523/pexels-photo-27100523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const clothingImages = [
  'https://images.pexels.com/photos/14564843/pexels-photo-14564843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16825855/pexels-photo-16825855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7011251/pexels-photo-7011251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39649871/pexels-photo-39649871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19461512/pexels-photo-19461512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/57749/pexels-photo-57749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const beltImages = [
  'https://images.pexels.com/photos/27565821/pexels-photo-27565821.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4452379/pexels-photo-4452379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4452374/pexels-photo-4452374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4452373/pexels-photo-4452373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const walletImages = [
  'https://images.pexels.com/photos/12495669/pexels-photo-12495669.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12495665/pexels-photo-12495665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12495664/pexels-photo-12495664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4452390/pexels-photo-4452390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4452506/pexels-photo-4452506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const capImages = [
  'https://images.pexels.com/photos/10156412/pexels-photo-10156412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6656472/pexels-photo-6656472.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6342793/pexels-photo-6342793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31631885/pexels-photo-31631885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20842755/pexels-photo-20842755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const glassesImages = [
  'https://images.pexels.com/photos/13909956/pexels-photo-13909956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28666270/pexels-photo-28666270.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36619825/pexels-photo-36619825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28666274/pexels-photo-28666274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31972252/pexels-photo-31972252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/928364/pexels-photo-928364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const panjabiImages = [
  'https://images.pexels.com/photos/14768019/pexels-photo-14768019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30228800/pexels-photo-30228800.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35933153/pexels-photo-35933153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12925431/pexels-photo-12925431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const lifestyleImages = [
  'https://images.pexels.com/photos/34976481/pexels-photo-34976481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3568521/pexels-photo-3568521.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33343186/pexels-photo-33343186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27206251/pexels-photo-27206251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const heroImages = [
  'https://images.pexels.com/photos/11900126/pexels-photo-11900126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3888212/pexels-photo-3888212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7778883/pexels-photo-7778883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39190712/pexels-photo-39190712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39190655/pexels-photo-39190655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export { heroImages };

function makeImages(arr: string[], index: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(arr[(index + i) % arr.length]);
  }
  return result;
}

interface ProductSeed {
  name: string;
  category: Product['category'];
  price: number;
  previousPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isStockClearance: boolean;
  images: string[];
  sizes: string[];
  popularity: number;
  description: string;
  specs: { label: string; value: string }[];
}

const productSeeds: ProductSeed[] = [
  // Shoes
  { name: 'Classic Oxford Leather Shoes', category: 'shoes', price: 2890, previousPrice: 3990, rating: 4.7, reviewCount: 128, inStock: true, stockCount: 15, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(shoeImages, 0), sizes: shoeSizes, popularity: 95, description: 'Timeless Oxford crafted from premium full-grain leather. Perfect for formal occasions and daily office wear.', specs: [{ label: 'Material', value: 'Full-grain leather' }, { label: 'Sole', value: 'Anti-slip TPR' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Sleek Black Formal Loafers', category: 'shoes', price: 2490, previousPrice: 3200, rating: 4.5, reviewCount: 86, inStock: true, stockCount: 8, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(shoeImages, 5), sizes: shoeSizes, popularity: 80, description: 'Slip-on loafers with a sleek profile. Ideal for semi-formal and smart-casual looks.', specs: [{ label: 'Material', value: 'Genuine leather' }, { label: 'Sole', value: 'EVA cushioned' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Brown Leather Dress Shoes', category: 'shoes', price: 2190, previousPrice: 2990, rating: 4.6, reviewCount: 64, inStock: true, stockCount: 12, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(shoeImages, 3), sizes: shoeSizes, popularity: 72, description: 'Rich brown dress shoes with a modern silhouette. Versatile for both office and events.', specs: [{ label: 'Material', value: 'Buffalo leather' }, { label: 'Sole', value: 'Leather + TPR' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Premium Black Leather Boots', category: 'shoes', price: 3290, previousPrice: 4500, rating: 4.8, reviewCount: 142, inStock: false, stockCount: 0, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(shoeImages, 2), sizes: shoeSizes, popularity: 90, description: 'Durable leather boots with a cushioned interior. Built for style and comfort.', specs: [{ label: 'Material', value: 'Full-grain leather' }, { label: 'Sole', value: 'Rubber grip' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Casual Slip-On Sneakers', category: 'shoes', price: 1590, previousPrice: 2290, rating: 4.3, reviewCount: 51, inStock: true, stockCount: 20, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(shoeImages, 6), sizes: shoeSizes, popularity: 68, description: 'Lightweight casual sneakers for everyday wear. Breathable and comfortable.', specs: [{ label: 'Material', value: 'Canvas + rubber' }, { label: 'Sole', value: 'EVA' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Designer Leather Moccasins', category: 'shoes', price: 1990, previousPrice: 2790, rating: 4.4, reviewCount: 39, inStock: true, stockCount: 6, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(shoeImages, 7), sizes: shoeSizes, popularity: 55, description: 'Handcrafted moccasins with a soft leather upper. Stylish and comfortable.', specs: [{ label: 'Material', value: 'Sheep leather' }, { label: 'Sole', value: 'TPR' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Bags
  { name: 'Luxury Black Leather Handbag', category: 'bags', price: 3490, previousPrice: 4990, rating: 4.8, reviewCount: 110, inStock: true, stockCount: 10, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(bagImages, 0), sizes: oneSize, popularity: 92, description: 'Elegant black leather handbag with spacious interior and premium hardware.', specs: [{ label: 'Material', value: 'Genuine leather' }, { label: 'Capacity', value: 'Medium' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Brown Leather Tote Bag', category: 'bags', price: 2890, previousPrice: 3990, rating: 4.6, reviewCount: 75, inStock: true, stockCount: 7, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(bagImages, 1), sizes: oneSize, popularity: 78, description: 'Versatile tote bag in rich brown leather. Perfect for work and daily use.', specs: [{ label: 'Material', value: 'Full-grain leather' }, { label: 'Capacity', value: 'Large' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Crocodile Texture Shoulder Bag', category: 'bags', price: 2590, previousPrice: 3500, rating: 4.5, reviewCount: 48, inStock: true, stockCount: 5, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(bagImages, 4), sizes: oneSize, popularity: 65, description: 'Stylish crocodile-texture shoulder bag with adjustable strap.', specs: [{ label: 'Material', value: 'Embossed leather' }, { label: 'Capacity', value: 'Medium' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Premium Crossbody Bag', category: 'bags', price: 2290, previousPrice: 3190, rating: 4.4, reviewCount: 42, inStock: true, stockCount: 9, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(bagImages, 2), sizes: oneSize, popularity: 58, description: 'Compact crossbody bag with premium leather finish and multiple compartments.', specs: [{ label: 'Material', value: 'Genuine leather' }, { label: 'Capacity', value: 'Small' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Designer Mini Handbag', category: 'bags', price: 1890, previousPrice: 2590, rating: 4.3, reviewCount: 33, inStock: false, stockCount: 0, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(bagImages, 6), sizes: oneSize, popularity: 50, description: 'Chic mini handbag for evening outings. Compact and stylish.', specs: [{ label: 'Material', value: 'PU leather' }, { label: 'Capacity', value: 'Mini' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Clothing
  { name: 'Premium Cotton Casual Shirt', category: 'clothing', price: 1290, previousPrice: 1890, rating: 4.5, reviewCount: 67, inStock: true, stockCount: 25, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(clothingImages, 0), sizes: clothingSizes, popularity: 85, description: 'Breathable cotton casual shirt with a modern fit. Perfect for everyday wear.', specs: [{ label: 'Material', value: '100% cotton' }, { label: 'Fit', value: 'Slim fit' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Slim Fit Formal Shirt', category: 'clothing', price: 1490, previousPrice: 2090, rating: 4.6, reviewCount: 54, inStock: true, stockCount: 18, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(clothingImages, 3), sizes: clothingSizes, popularity: 76, description: 'Crisp formal shirt with a slim silhouette. Ideal for office and events.', specs: [{ label: 'Material', value: 'Cotton blend' }, { label: 'Fit', value: 'Slim fit' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Tailored Blazer Jacket', category: 'clothing', price: 3290, previousPrice: 4500, rating: 4.7, reviewCount: 45, inStock: true, stockCount: 8, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(clothingImages, 1), sizes: clothingSizes, popularity: 70, description: 'Sharp tailored blazer for a polished look. Premium fabric with structured fit.', specs: [{ label: 'Material', value: 'Poly-wool blend' }, { label: 'Fit', value: 'Tailored' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Designer Graphic T-Shirt', category: 'clothing', price: 790, previousPrice: 1290, rating: 4.2, reviewCount: 89, inStock: true, stockCount: 30, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(clothingImages, 4), sizes: clothingSizes, popularity: 88, description: 'Soft cotton t-shirt with a modern graphic print. Casual and comfortable.', specs: [{ label: 'Material', value: 'Combed cotton' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Stylish Polo Shirt', category: 'clothing', price: 990, previousPrice: 1590, rating: 4.4, reviewCount: 38, inStock: true, stockCount: 22, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(clothingImages, 5), sizes: clothingSizes, popularity: 60, description: 'Classic polo shirt in breathable pique cotton. Versatile for casual wear.', specs: [{ label: 'Material', value: 'Pique cotton' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Casual Denim Jeans', category: 'clothing', price: 1790, previousPrice: 2490, rating: 4.5, reviewCount: 72, inStock: true, stockCount: 14, isBestSeller: true, isNewArrival: true, isStockClearance: false, images: makeImages(clothingImages, 2), sizes: clothingSizes, popularity: 82, description: 'Premium denim jeans with a modern slim cut. Comfortable stretch fabric.', specs: [{ label: 'Material', value: 'Stretch denim' }, { label: 'Fit', value: 'Slim' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Belts
  { name: 'Premium Leather Belt with Buckle', category: 'belts', price: 890, previousPrice: 1290, rating: 4.5, reviewCount: 56, inStock: true, stockCount: 20, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(beltImages, 0), sizes: oneSize, popularity: 75, description: 'Full-grain leather belt with a polished chrome buckle. Classic and durable.', specs: [{ label: 'Material', value: 'Full-grain leather' }, { label: 'Buckle', value: 'Chrome metal' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Reversible Casual Belt', category: 'belts', price: 690, previousPrice: 990, rating: 4.3, reviewCount: 34, inStock: true, stockCount: 15, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(beltImages, 1), sizes: oneSize, popularity: 62, description: 'Two-in-one reversible belt for versatile styling. Black on one side, brown on the other.', specs: [{ label: 'Material', value: 'Genuine leather' }, { label: 'Buckle', value: 'Reversible' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Designer Studded Belt', category: 'belts', price: 790, previousPrice: 1190, rating: 4.2, reviewCount: 21, inStock: true, stockCount: 8, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(beltImages, 2), sizes: oneSize, popularity: 45, description: 'Fashion-forward studded belt for a bold look. Statement accessory.', specs: [{ label: 'Material', value: 'PU leather' }, { label: 'Buckle', value: 'Studded' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Wallets
  { name: 'Handcrafted Leather Wallet', category: 'wallets', price: 690, previousPrice: 990, rating: 4.6, reviewCount: 78, inStock: true, stockCount: 25, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(walletImages, 0), sizes: oneSize, popularity: 84, description: 'Slim handcrafted leather wallet with multiple card slots and a cash compartment.', specs: [{ label: 'Material', value: 'Genuine leather' }, { label: 'Slots', value: '8 card slots' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Premium Bifold Wallet', category: 'wallets', price: 890, previousPrice: 1290, rating: 4.7, reviewCount: 52, inStock: true, stockCount: 12, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(walletImages, 1), sizes: oneSize, popularity: 70, description: 'Classic bifold wallet in premium leather. Compact and functional.', specs: [{ label: 'Material', value: 'Full-grain leather' }, { label: 'Slots', value: '6 card slots' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Minimalist Card Holder', category: 'wallets', price: 490, previousPrice: 790, rating: 4.4, reviewCount: 29, inStock: true, stockCount: 18, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(walletImages, 2), sizes: oneSize, popularity: 48, description: 'Ultra-slim card holder for the modern minimalist. Fits in any pocket.', specs: [{ label: 'Material', value: 'PU leather' }, { label: 'Slots', value: '4 card slots' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Vintage Leather Long Wallet', category: 'wallets', price: 990, previousPrice: 1490, rating: 4.5, reviewCount: 36, inStock: false, stockCount: 0, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(walletImages, 3), sizes: oneSize, popularity: 52, description: 'Spacious long wallet with vintage appeal. Multiple compartments and a zip pocket.', specs: [{ label: 'Material', value: 'Vintage leather' }, { label: 'Slots', value: '12 card slots' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Caps
  { name: 'Classic Black Sports Cap', category: 'caps', price: 490, previousPrice: 790, rating: 4.4, reviewCount: 63, inStock: true, stockCount: 30, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(capImages, 0), sizes: oneSize, popularity: 80, description: 'Adjustable sports cap in classic black. Breathable and comfortable for daily wear.', specs: [{ label: 'Material', value: 'Cotton twill' }, { label: 'Closure', value: 'Adjustable strap' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Stylish Snapback Cap', category: 'caps', price: 590, previousPrice: 890, rating: 4.3, reviewCount: 41, inStock: true, stockCount: 22, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(capImages, 1), sizes: oneSize, popularity: 65, description: 'Urban-style snapback cap with a flat brim. Modern streetwear essential.', specs: [{ label: 'Material', value: 'Cotton blend' }, { label: 'Closure', value: 'Snapback' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Camo Print Designer Cap', category: 'caps', price: 690, previousPrice: 990, rating: 4.2, reviewCount: 25, inStock: true, stockCount: 10, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(capImages, 3), sizes: oneSize, popularity: 42, description: 'Camouflage print cap for a bold statement. Stand out from the crowd.', specs: [{ label: 'Material', value: 'Cotton twill' }, { label: 'Closure', value: 'Adjustable' }, { label: 'Origin', value: 'Bangladesh' }] },

  // Glasses
  { name: 'Designer Aviator Sunglasses', category: 'glasses', price: 890, previousPrice: 1290, rating: 4.6, reviewCount: 87, inStock: true, stockCount: 18, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(glassesImages, 0), sizes: oneSize, popularity: 88, description: 'Classic aviator sunglasses with UV400 protection. Timeless style for any face shape.', specs: [{ label: 'Lens', value: 'UV400 polarized' }, { label: 'Frame', value: 'Metal alloy' }, { label: 'Origin', value: 'Imported' }] },
  { name: 'Retro Round Sunglasses', category: 'glasses', price: 690, previousPrice: 990, rating: 4.4, reviewCount: 45, inStock: true, stockCount: 14, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(glassesImages, 1), sizes: oneSize, popularity: 68, description: 'Retro-inspired round frames with a modern twist. Lightweight and stylish.', specs: [{ label: 'Lens', value: 'UV400' }, { label: 'Frame', value: 'Acetate' }, { label: 'Origin', value: 'Imported' }] },
  { name: 'Premium Wayfarer Sunglasses', category: 'glasses', price: 990, previousPrice: 1490, rating: 4.7, reviewCount: 62, inStock: true, stockCount: 9, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(glassesImages, 2), sizes: oneSize, popularity: 85, description: 'Iconic wayfarer design with premium polarized lenses. A wardrobe staple.', specs: [{ label: 'Lens', value: 'UV400 polarized' }, { label: 'Frame', value: 'Acetate' }, { label: 'Origin', value: 'Imported' }] },
  { name: 'Fashion Cat-Eye Sunglasses', category: 'glasses', price: 790, previousPrice: 1090, rating: 4.3, reviewCount: 28, inStock: true, stockCount: 7, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(glassesImages, 3), sizes: oneSize, popularity: 50, description: 'Chic cat-eye sunglasses for a fashionable look. Statement eyewear.', specs: [{ label: 'Lens', value: 'UV400' }, { label: 'Frame', value: 'Acetate' }, { label: 'Origin', value: 'Imported' }] },
  { name: 'Sport Wrap Sunglasses', category: 'glasses', price: 590, previousPrice: 890, rating: 4.2, reviewCount: 19, inStock: false, stockCount: 0, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(glassesImages, 4), sizes: oneSize, popularity: 40, description: 'Wrap-around sport sunglasses with impact-resistant lenses. Perfect for outdoor activities.', specs: [{ label: 'Lens', value: 'UV400 polarized' }, { label: 'Frame', value: 'TR90' }, { label: 'Origin', value: 'Imported' }] },

  // Lifestyle
  { name: 'Luxury Lifestyle Accessory Set', category: 'lifestyle', price: 1490, previousPrice: 2290, rating: 4.5, reviewCount: 33, inStock: true, stockCount: 12, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(lifestyleImages, 0), sizes: oneSize, popularity: 60, description: 'Curated lifestyle accessory set featuring a handbag, sunglasses, and more.', specs: [{ label: 'Includes', value: 'Bag, sunglasses, accessories' }, { label: 'Material', value: 'Mixed' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Minimalist Tech Organizer', category: 'lifestyle', price: 990, previousPrice: 1490, rating: 4.4, reviewCount: 26, inStock: true, stockCount: 16, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(lifestyleImages, 1), sizes: oneSize, popularity: 55, description: 'Keep your essentials organized with this sleek tech and lifestyle pouch.', specs: [{ label: 'Material', value: 'Canvas + leather' }, { label: 'Capacity', value: 'Medium' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Premium Hair Clip Collection', category: 'lifestyle', price: 390, previousPrice: 690, rating: 4.2, reviewCount: 15, inStock: true, stockCount: 25, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(lifestyleImages, 2), sizes: oneSize, popularity: 38, description: 'Set of premium minimalist hair clips in neutral tones. Everyday elegance.', specs: [{ label: 'Material', value: 'Acetate' }, { label: 'Pieces', value: '6 clips' }, { label: 'Origin', value: 'Imported' }] },

  // Panjabi
  { name: 'Premium Cotton Panjabi — White', category: 'panjabi', price: 1490, previousPrice: 2190, rating: 4.7, reviewCount: 94, inStock: true, stockCount: 20, isBestSeller: true, isNewArrival: false, isStockClearance: false, images: makeImages(panjabiImages, 0), sizes: clothingSizes, popularity: 90, description: 'Elegant white cotton panjabi with fine embroidery. Perfect for festive occasions and daily wear.', specs: [{ label: 'Material', value: '100% cotton' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Festive Silk Panjabi — Maroon', category: 'panjabi', price: 1990, previousPrice: 2790, rating: 4.8, reviewCount: 67, inStock: true, stockCount: 10, isBestSeller: false, isNewArrival: true, isStockClearance: false, images: makeImages(panjabiImages, 1), sizes: clothingSizes, popularity: 78, description: 'Rich maroon silk panjabi with intricate neck design. Ideal for Eid and special events.', specs: [{ label: 'Material', value: 'Silk blend' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Casual Linen Panjabi — Olive', category: 'panjabi', price: 1290, previousPrice: 1890, rating: 4.5, reviewCount: 38, inStock: true, stockCount: 15, isBestSeller: false, isNewArrival: false, isStockClearance: false, images: makeImages(panjabiImages, 2), sizes: clothingSizes, popularity: 65, description: 'Breathable linen panjabi in olive green. Comfortable for everyday and casual wear.', specs: [{ label: 'Material', value: 'Linen blend' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
  { name: 'Designer Embroidered Panjabi — Red', category: 'panjabi', price: 2290, previousPrice: 3290, rating: 4.6, reviewCount: 29, inStock: false, stockCount: 0, isBestSeller: false, isNewArrival: false, isStockClearance: true, images: makeImages(panjabiImages, 3), sizes: clothingSizes, popularity: 50, description: 'Statement red panjabi with premium embroidery work. A festive standout piece.', specs: [{ label: 'Material', value: 'Cotton silk' }, { label: 'Fit', value: 'Regular' }, { label: 'Origin', value: 'Bangladesh' }] },
];

export const products: Product[] = productSeeds.map((seed, i) => ({
  id: `p${i + 1}`,
  name: seed.name,
  slug: seed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  category: seed.category,
  images: seed.images,
  price: seed.price,
  previousPrice: seed.previousPrice,
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  inStock: seed.inStock,
  stockCount: seed.stockCount,
  isBestSeller: seed.isBestSeller,
  isNewArrival: seed.isNewArrival,
  isStockClearance: seed.isStockClearance,
  description: seed.description,
  specifications: seed.specs,
  deliveryInfo: 'Free delivery on orders over ৳2000. Standard delivery in 2-4 business days inside Dhaka, 3-7 days outside Dhaka. Cash on Delivery available.',
  variants: {
    sizes: seed.sizes,
    colors: commonColors.slice(0, 4),
  },
  createdAt: new Date(2025, 9, 30 - i).toISOString(),
  popularity: seed.popularity,
}));

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', customerName: 'Rahim Ahmed', rating: 5, date: '2025-09-15', comment: 'Excellent quality! The leather is premium and the fit is perfect. Highly recommended.' },
  { id: 'r2', productId: 'p1', customerName: 'Karim Hassan', rating: 4, date: '2025-09-10', comment: 'Good shoes, comfortable for daily wear. Slightly tight at first but breaks in nicely.' },
  { id: 'r3', productId: 'p1', customerName: 'Tanvir Mahmud', rating: 5, date: '2025-08-28', comment: 'Best purchase this year. Looks even better in person.' },
  { id: 'r4', productId: 'p7', customerName: 'Sadia Islam', rating: 5, date: '2025-09-20', comment: 'Beautiful bag! Spacious and the leather quality is amazing.' },
  { id: 'r5', productId: 'p7', customerName: 'Nusrat Jahan', rating: 4, date: '2025-09-05', comment: 'Love the design. Wish it had a few more inner pockets though.' },
  { id: 'r6', productId: 'p13', customerName: 'Arif Rahman', rating: 5, date: '2025-09-22', comment: 'Perfect fit and great fabric. Will order more colors.' },
  { id: 'r7', productId: 'p25', customerName: 'Fahim Chowdhury', rating: 5, date: '2025-09-18', comment: 'Excellent panjabi for Eid. The embroidery is beautiful.' },
  { id: 'r8', productId: 'p22', customerName: 'Sakib Al Hasan', rating: 4, date: '2025-09-12', comment: 'Good wallet, slim and holds all my cards. Delivery was quick.' },
  { id: 'r9', productId: 'p28', customerName: 'Mehedi Hasan', rating: 5, date: '2025-09-25', comment: 'These sunglasses are stylish and the UV protection is great.' },
  { id: 'r10', productId: 'p2', customerName: 'Imran Khan', rating: 4, date: '2025-09-08', comment: 'Nice loafers for the price. Comfortable and looks premium.' },
];

export const customers: Customer[] = [
  { id: 'u1', name: 'Rahim Ahmed', email: 'rahim@example.com', phone: '+8801712345678', totalOrders: 12, totalSpent: 34890, joinedAt: '2024-03-15' },
  { id: 'u2', name: 'Sadia Islam', email: 'sadia@example.com', phone: '+8801823456789', totalOrders: 8, totalSpent: 21990, joinedAt: '2024-06-20' },
  { id: 'u3', name: 'Karim Hassan', email: 'karim@example.com', phone: '+8801934567890', totalOrders: 5, totalSpent: 12450, joinedAt: '2024-08-10' },
  { id: 'u4', name: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '+8801612345671', totalOrders: 15, totalSpent: 42600, joinedAt: '2023-12-05' },
  { id: 'u5', name: 'Arif Rahman', email: 'arif@example.com', phone: '+8801512345672', totalOrders: 3, totalSpent: 5670, joinedAt: '2025-01-22' },
];

export const customerReviews = [
  { id: 'cr1', name: 'Rahim Ahmed', location: 'Dhaka', rating: 5, comment: 'Klovyq has become my go-to for fashion. Quality is consistently excellent and delivery is always on time.', avatar: 'RA' },
  { id: 'cr2', name: 'Sadia Islam', location: 'Chittagong', rating: 5, comment: 'Beautiful products and amazing customer service. The leather bags are worth every taka.', avatar: 'SI' },
  { id: 'cr3', name: 'Tanvir Mahmud', location: 'Sylhet', rating: 4, comment: 'Great variety and competitive prices. The Panjabi collection for Eid was outstanding.', avatar: 'TM' },
  { id: 'cr4', name: 'Nusrat Jahan', location: 'Dhaka', rating: 5, comment: 'I have ordered multiple times and never been disappointed. Highly recommend Klovyq!', avatar: 'NJ' },
];

export const formatBDT = (amount: number): string => `৳${amount.toLocaleString('en-BD')}`;
