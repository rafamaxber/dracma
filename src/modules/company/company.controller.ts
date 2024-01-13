import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '../user-auth/user.decorator';
import { UserAuthType } from '../user-auth/entity/user-auth';
import { CreateMyCompanyUsecase } from './use-cases/create-my-company';
import { CreateMyCompanyDto } from './dto/create-my-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly createMyCompanyUsecase: CreateMyCompanyUsecase,
  ) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
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
  findAll(@User() user: UserAuthType) {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
