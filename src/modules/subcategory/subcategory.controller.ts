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
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { User, UserType } from '../user-auth/user.decorator';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  create(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.subcategoryService.create(companyId, createSubcategoryDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    const filters = Object.assign(
      {},
      name && {
        name: {
          contains: name,
        },
      },
    );
    return this.subcategoryService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(+id);
  }
}
