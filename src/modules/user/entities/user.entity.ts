import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty({ required: false })
  id: number;

  @IsString()
  @ApiProperty({ required: true })
  firstName: string;

  @IsString()
  @ApiProperty({ required: true })
  lastName: string;

  @IsString()
  @ApiProperty({ required: true })
  nickName: string;

  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  @Exclude()
  password: string;

  @ApiProperty({ required: false })
  companyId: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
