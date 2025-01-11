export interface reqParamFindProduct {
  id?: number;
  name?: string;
  barcode?: string;
  category?: string;
}

export interface reqParamAddProduct {
  name: string;
  barcode: string;
  price: number;
  qty?: string;
  category: string;
  description: string;
}
