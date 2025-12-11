import { Product, Category } from './types';

export const APP_NAME = "Hanumantay Enterprise";
export const TAGLINE = "Wholesaler of Hankies & Scarves";
export const ADDRESS = "Gheekanta Kalupur, Near Relief Road, Ahmedabad";
export const WORKING_HOURS = "Mon - Sat: 10:00 AM - 8:00 PM";
export const WHATSAPP_DISPLAY = "+91 98765 43210";

// --- Product Images ---

// Previously provided
const IMG_HANKY_MAIN = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T12-57-28-558Z-a29a69b7-chat-image-1765371448538-0.jpg";
const IMG_SCARF_MAIN = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T12-57-28-734Z-60747ff7-chat-image-1765371448715-1.jpg";

// New Batch (Dec 10)
const IMG_MEN_BOXED = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T14-47-06-744Z-1e9abc5c-chat-image-1765378026725-0.jpg";
const IMG_DECO_BASKET = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T14-47-06-912Z-7f1adc69-chat-image-1765378026893-1.jpg";
const IMG_WOMEN_FLORAL = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T14-47-07-074Z-5159011a-chat-image-1765378027056-2.jpg";
const IMG_WINTER_SCARF = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T14-47-07-241Z-c4b0c45e-chat-image-1765378027220-3.jpg";
const IMG_POCKET_SQUARE = "https://nyc3.digitaloceanspaces.com/bhindi-drive/files/7cd446bd-de40-4e91-b848-0b1e56a97db3/2025-12-10T14-47-38-542Z-73902bdb-chat-image-1765378058525-0.jpg";


export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Men\'s Handkerchiefs',
    category: Category.MEN_HANKIES,
    price: 180, // Placeholder wholesale price per dozen
    minOrder: 10, // Dozens
    image: IMG_HANKY_MAIN,
    description: '100% pure cotton, soft texture, high absorbency. Classic white with subtle borders.',
    packsAvailable: ['12pc Box', 'Loose Dozen']
  },
  {
    id: '2',
    name: 'Luxury Silk Scarf - Floral Print',
    category: Category.SCARVES,
    price: 350,
    minOrder: 5,
    image: IMG_SCARF_MAIN,
    description: 'Elegant floral patterns on a lightweight silk blend. Perfect for premium retail counters.',
    packsAvailable: ['1pc Polybag', '5pc Bundle']
  },
  {
    id: '3',
    name: 'Men\'s Boxed Gift Set (3pc)',
    category: Category.MEN_PACKAGED,
    price: 120,
    minOrder: 24,
    image: IMG_MEN_BOXED,
    description: 'Premium gift packaging containing 3 checkered handkerchiefs. Ideal for festive sales.',
    packsAvailable: ['3pc Box']
  },
  {
    id: '4',
    name: 'Decorative Hanky Basket',
    category: Category.HANKIES_BASKETS,
    price: 550,
    minOrder: 2,
    image: IMG_DECO_BASKET,
    description: 'Assorted collection of ladies\' handkerchiefs in a reusable decorative basket.',
    packsAvailable: ['1 Basket (24pc)']
  },
  {
    id: '5',
    name: 'Women\'s Floral Print Daily Use',
    category: Category.WOMEN_PRINTED,
    price: 90,
    minOrder: 20,
    image: IMG_WOMEN_FLORAL,
    description: 'Soft cotton printed handkerchiefs for daily use. Vibrant colors and fast-washing dyes.',
    packsAvailable: ['12pc Polybag']
  },
  {
    id: '6',
    name: 'Winter Woolen Scarf - Charcoal',
    category: Category.SCARVES,
    price: 250,
    minOrder: 10,
    image: IMG_WINTER_SCARF,
    description: 'Heavy duty warm wool blend scarves. Essential for winter stock.',
    packsAvailable: ['1pc Tagged']
  },
  {
    id: '7',
    name: 'Formal Pocket Square Set',
    category: Category.MEN_HANKIES,
    price: 75,
    minOrder: 15,
    image: IMG_POCKET_SQUARE,
    description: 'Satin finish pocket squares for suits and blazers. Assorted solid colors.',
    packsAvailable: ['1pc Box']
  },
  {
    id: '8',
    name: 'Family Pack Combo',
    category: Category.MEN_PACKAGED,
    price: 200,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1616684803366-419d8540c5f9?auto=format&fit=crop&q=80&w=800',
    description: 'Value pack containing men\'s, women\'s and kids\' handkerchiefs.',
    packsAvailable: ['12pc Master Pack']
  }
];