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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto, @User() user: UserType) {
    const { companyId } = user;
    return this.supplierService.create(companyId, createSupplierDto);
  }

  @Get()
  findAll(
    @User() user: UserType,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
    @Query('name') name?: string,
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
    return this.supplierService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.supplierService.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSupplierDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.supplierService.update(companyId, +id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.supplierService.remove(companyId, +id);
  }
}
