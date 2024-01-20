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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User, UserType } from '../user-auth/user.decorator';
import { UserAuthType } from '../user-auth/entity/user-auth';
import { CreateMyCompanyUsecase } from './use-cases/create-my-company';
import { CreateMyCompanyDto } from './dto/create-my-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly createMyCompanyUsecase: CreateMyCompanyUsecase,
  ) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: UserType) {
    const { companyId } = user;
    return this.companyService.create(companyId, createCompanyDto);
  }

  @Post('create-my')
  createMyCompany(
    @Body() createCompanyDto: CreateMyCompanyDto,
    @User() user: UserAuthType,
  ) {
    return this.createMyCompanyUsecase.execute({
      ...createCompanyDto,
      userId: user.id,
    });
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
    return this.companyService.findAll(companyId, {
      perPage,
      filters,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.companyService.findOne(companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: UserType,
  ) {
    const { companyId } = user;
    return this.companyService.update(companyId, +id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    const { companyId } = user;
    return this.companyService.remove(companyId, +id);
  }
}
