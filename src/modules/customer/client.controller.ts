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
import { CustomerService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customer')
export class ClientController {
  constructor(private readonly clientService: CustomerService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @User() user: UserType) {
    const { companyId } = user;
    return this.clientService.create(companyId, createClientDto);
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
    @Body() updateClientDto: UpdateClientDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.clientService.update(companyId, +id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.clientService.remove(companyId, +id);
  }
}
