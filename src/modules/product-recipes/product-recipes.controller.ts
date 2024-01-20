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
import { ProductRecipesService } from './product-recipes.service';
import { CreateProductRecipeDto } from './dto/create-product-recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product-recipe.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserType } from '../user-auth/user.decorator';

@ApiBearerAuth()
@ApiTags('Product Recipe')
@Controller('product-recipes')
export class ProductRecipesController {
  constructor(private readonly service: ProductRecipesService) {}

  @Post()
  create(@Body() createDto: CreateProductRecipeDto, @User() user: UserType) {
    const { companyId } = user;
    return this.service.create(companyId, createDto);
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
    @Body() updateDto: UpdateProductRecipeDto,
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
