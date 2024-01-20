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
import { FeedstockService } from './feedstock.service';
import { CreateFeedstockDto } from './dto/create-feedstock.dto';
import { UpdateFeedstockDto } from './dto/update-feedstock.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserType } from '../user-auth/user.decorator';

@ApiBearerAuth()
@ApiTags('Feedstock')
@Controller('feedstock')
export class FeedstockController {
  constructor(private readonly service: FeedstockService) {}

  @Post()
  create(@Body() createDto: CreateFeedstockDto, @User() user: UserType) {
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
    @Body() updateDto: UpdateFeedstockDto,
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
