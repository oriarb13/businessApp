export interface IReview {
  _id: string;
  userId: Subscriber;
  businessId: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  image?: string;
  plan?: "Standard" | "Gold" | "Platinum";
  savedBusinesses?: string[];
  ownBusinesses?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscriber {
  _id: string;
  username?: string;
  email?: string;
  image?: string;
  plan?: "Standard" | "Gold" | "Platinum";
  savedBusinesses?: string[];
  ownBusinesses?: string[];
}
export interface IBusiness {
  _id?: string;
  name: string;
  img?: string;
  description?: string;
  category?: string;
  owner?: string | Subscriber;
  subscribers?: string[] | Subscriber[];
  createdAt?: string;
  updatedAt?: string;
}
