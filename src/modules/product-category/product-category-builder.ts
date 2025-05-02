import { Injectable } from '@nestjs/common';

export interface ProductCategory {
  id: number;
  name: string;
  images: string[];
  parentId: number | null;
  categories: ProductCategory[];
}

@Injectable()
export class ProductCategoryBuilder {
  buildHierarchy(categories, parentId = null): ProductCategory[] {
    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId,
    );

    const hierarchicalCategories = filteredCategories.map((category) => ({
      id: category.id,
      name: category.name,
      images: category.images.map((image) => image.imageUrl),
      parentId: category.parentId,
      categories: this.buildHierarchy(categories, category.id),
    }));

    return hierarchicalCategories;
  }
}
