export interface Param {
  id: number;
  name: string;
  code: string;
  canBeResold: any;
  price_sell: number;
  price_cost: number;
  manufacturer: boolean;
  barcode?: number;
  status: string;
  quantity: number;
  description: string;
  weight: number;
  stock: boolean;
  stock_min: number;
  stock_max: number;
  removeFeedstockFromStock: boolean;
  unitId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  supplierId: number | null;
  supplier: {
    id: number;
    name: string;
  };
  product_category_map: Array<{
    category: {
      id: number;
      name: string;
    };
  }>;
  unit: {
    id: number;
    name: string;
  };
  productImages: Array<{
    imageUrl: string;
    isMain?: boolean;
  }>;
}

export interface Response {
  id: number;
  name: string;
  code: string;
  canBeResold: boolean;
  price_sell: number;
  price_cost: number;
  manufacturer: boolean;
  barcode?: number;
  status: string;
  quantity: number;
  description: string;
  weight: number;
  stock: boolean;
  stock_min: number;
  stock_max: number;
  removeFeedstockFromStock: boolean;
  updatedAt: string;
  supplier?: {
    id: number;
    name: string;
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  unit: string;
  images: Array<{
    imageUrl: string;
    isMain?: boolean;
  }>;
}

export class ProductResponse {
  map(param: Param): Response {
    return {
      id: param.id,
      name: param.name,
      code: param.code,
      canBeResold: Boolean(param?.canBeResold),
      price_sell: param.price_sell,
      price_cost: param.price_cost,
      manufacturer: Boolean(param.manufacturer),
      barcode: param.barcode,
      status: param.status,
      quantity: param.quantity,
      description: param.description,
      weight: param.weight,
      stock: Boolean(param.stock),
      stock_min: param.stock_min,
      stock_max: param.stock_max,
      removeFeedstockFromStock: Boolean(param.removeFeedstockFromStock),
      updatedAt: param.updatedAt,
      supplier: {
        id: param?.supplier?.id,
        name: param?.supplier?.name,
      },
      categories: param?.product_category_map.map((category) => ({
        id: category?.category.id,
        name: category?.category.name,
      })),
      unit: param?.unit?.name,
      images: param.productImages.map((image) => ({
        imageUrl: image?.imageUrl,
        isMain: image?.isMain,
      })),
    };
  }
}
