export enum Category {
  SCARVES = 'Scarves',
  MEN_HANKIES = 'Men Hankies',
  MEN_PACKAGED = 'Men Packaged Hankies',
  HANKIES_BASKETS = 'Hankies Baskets',
  WOMEN_PRINTED = 'Women Printed Hankies',
  ALL = 'All'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // Wholesale price placeholder
  minOrder: number;
  image: string;
  description: string;
  packsAvailable: string[]; // e.g., "6pc", "12pc"
}

export interface InquiryFormState {
  fullName: string;
  businessName: string;
  whatsapp: string;
  email: string;
  city: string;
  productType: string;
  message: string;
}
