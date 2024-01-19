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
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { User, UserType } from '../user-auth/user.decorator';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  create(@Body() createTransferDto: CreateTransferDto, @User() user: UserType) {
    const { companyId } = user;
    return this.transferService.create(companyId, createTransferDto);
  }

  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('q') q: string,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.transferService.findAll(companyId, {
      perPage,
      filters: {
        name: q,
      },
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    return this.transferService.update(+id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferService.remove(+id);
  }
}
