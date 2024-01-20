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
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserType } from '../user-auth/user.decorator';

@ApiBearerAuth()
@ApiTags('Units of measurement')
@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) {}

  @Post()
  create(@Body() createDto: CreateUnitDto, @User() user: UserType) {
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
    @Body() updateDto: UpdateUnitDto,
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
