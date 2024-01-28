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
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PlanEntity } from './entities/plan.entity';

// TODO: Incluir permissionamento para apenas administradores
@ApiBearerAuth()
@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiCreatedResponse({ type: PlanEntity })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('name') name: string,
  ) {
    const cleanName = String(name).trim();
    const filters = Object.assign(
      {},
      name && {
        name: {
          contains: cleanName,
        },
      },
    );
    return this.plansService.findAll({
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
