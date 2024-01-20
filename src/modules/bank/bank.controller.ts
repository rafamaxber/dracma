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
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Banks')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto, @User() user: UserType) {
    const { companyId } = user;
    return this.bankService.create(companyId, createBankDto);
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
    return this.bankService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.bankService.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.bankService.update(companyId, +id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.bankService.remove(companyId, +id);
  }
}
