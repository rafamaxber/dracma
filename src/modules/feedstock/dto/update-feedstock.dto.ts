import { PartialType } from '@nestjs/swagger';
import { CreateFeedstockDto } from './create-feedstock.dto';

export class UpdateFeedstockDto extends PartialType(CreateFeedstockDto) {}
