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

@ApiBearerAuth()
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly createProductUseCase: CreateProductUseCase,
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
    @Query('name') name: string,
    @User()
    user: UserType,
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
    @Body() updateDto: UpdateProductDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.service.update(companyId, +id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.service.remove(companyId, +id);
  }
}
