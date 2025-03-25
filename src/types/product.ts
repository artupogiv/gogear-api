export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreateInput {
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
}
