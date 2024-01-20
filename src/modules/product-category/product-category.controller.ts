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
  constructor(private readonly service: ProductCategoryService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.service.create(companyId, createCategoryDto);
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
    const cleanName = String(name).trim();

    const filters = Object.assign(
      {},
      name && {
        name: {
          contains: cleanName,
        },
      },
    );
    return this.service.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.service.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateProductCategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.service.update(companyId, +id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.service.remove(companyId, +id);
  }
}
