import { MinLength } from 'class-validator';

export class CreatePlanDto {
  @MinLength(3)
  name: string;
}
