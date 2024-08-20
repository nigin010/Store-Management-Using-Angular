export type DefaultResponse<T> = {
  count: number;
  error: string;
  status: string;
  data: Array<T>;
};

export interface Transaction {
  nameOfTheCustomer: string;
  totalSpent: number;
  itemsBought: string;
  transactionDate: Date;
}

export interface Stock {
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  userName: string;
  productName: string;
  imageUrl: string;
  totalQuantity: number;
  finalPrice: number;
}

export interface FinalCartItem {
  userName: string;
  productName: string;
  totalQuantity: number;
  finalPrice: number;
}

export interface BillData {
  cartItems: FinalCartItem[];
  finalBillAmount: string;
  message: string;
}
