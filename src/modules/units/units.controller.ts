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
// TODO: Incluir permissionamento para apenas administradores
@ApiBearerAuth()
@ApiTags('Units of measurement')
@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) {}

  @Post()
  create(@Body() createDto: CreateUnitDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage = null,
    @Query('page') page = null,
    @Query('name') name: string,
    // filterQueryDto: FilterQueryDto = { name: '' },
  ) {
    // const { name } = filterQueryDto;
    const cleanName = String(name).trim();

    const filters = Object.assign(
      {},
      name && {
        name: {
          contains: cleanName,
        },
      },
    );
    return this.service.findAll({
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateUnitDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
