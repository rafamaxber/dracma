import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllCategoryProductsUseCase } from './use-cases/find-all-category-product';
import { CreateCategoryProductUseCase } from './use-cases/create-category-product';
import { FindCategoryProductsUseCase } from './use-cases/find-category-product';
import { UpdateCategoryProductUseCase } from './use-cases/update-category-product';

@ApiBearerAuth()
@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly findAllCategoryProducts: FindAllCategoryProductsUseCase,
    private readonly createCategoryProduct: CreateCategoryProductUseCase,
    private readonly findCategoryProducts: FindCategoryProductsUseCase,
    private readonly updateCategoryProduct: UpdateCategoryProductUseCase,
    private readonly service: ProductCategoryService,
  ) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.createCategoryProduct.execute(companyId, createCategoryDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage = null,
    @Query('page') page = null,
    @Query('name') name: string,
    // filterQueryDto: FilterQueryDto = { name: '' },
    @User()
    user: UserType,
  ) {
    // const { name } = filterQueryDto;
    const { companyId } = user;
    const cleanName = String(name || '').trim();

    return this.findAllCategoryProducts.execute(companyId, {
      perPage,
      page,
      filters: {
        name: cleanName,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.findCategoryProducts.execute(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.updateCategoryProduct.execute(
      companyId,
      +id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.service.remove(companyId, +id);
  }
}
