import { Plans } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PlanEntity implements Plans {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true, example: 'Basic' })
  name: string;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date | null;
}
