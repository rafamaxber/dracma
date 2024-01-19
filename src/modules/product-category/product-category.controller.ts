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

@ApiBearerAuth()
@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly categoryService: ProductCategoryService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.categoryService.create(companyId, createCategoryDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    const cleanName = String(name).trim();
    const filters = Object.assign(
      {},
      name && {
        name: {
          contains: cleanName,
        },
      },
    );
    return this.categoryService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.categoryService.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.categoryService.update(companyId, +id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.categoryService.remove(companyId, +id);
  }
}
