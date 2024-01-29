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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserType } from '../user-auth/user.decorator';
import { CreateProductUseCase } from './use-cases/create-product';
import { FindAllProductsUseCase } from './use-cases/find-all-product';
import { UpdateProductUseCase } from './use-cases/update-product';
import { FindProductUseCase } from './use-cases/find-product';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user: UserType) {
    const { companyId } = user;
    return this.createProductUseCase.execute(companyId, createProductDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage = null,
    @Query('page') page = null,
    @Query('name') name = '',
    @Query('category') category = '',
    @Query('code') code = '',
    @User()
    user: UserType,
  ) {
    const { companyId } = user;
    const cleanName = String(name).trim();

    const filters = Object.assign(
      {},
      name && {
        name: cleanName,
      },
      category && {
        category,
      },
      code && {
        code,
      },
    );

    return this.findAllProductsUseCase.execute(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.findProductUseCase.execute(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.updateProductUseCase.execute(companyId, +id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.service.remove(companyId, +id);
  }
}
