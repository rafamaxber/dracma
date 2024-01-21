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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly clientService: CustomerService) {}

  @Post()
  create(@Body() createDto: CreateCustomerDto, @User() user: UserType) {
    const { companyId } = user;
    return this.clientService.create(companyId, createDto);
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
    return this.clientService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.clientService.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomerDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.clientService.update(companyId, +id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.clientService.remove(companyId, +id);
  }
}
