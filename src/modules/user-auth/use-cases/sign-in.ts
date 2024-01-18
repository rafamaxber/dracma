import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { HashService } from '../../../cripto/hash/hash.service';
import { SigInUserDto } from '../dto/sigin-user.dto';
import { UserAuthType } from '../entity/user-auth';

@Injectable()
export class SignInUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SigInUserDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const tokenPayloadData: UserAuthType = {
      id: user.idExternal,
      companyId: user?.companyId ? String(user.companyId) : null,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
    };

    const token = await this.jwtService.signAsync(tokenPayloadData);

    return {
      access_token: token,
    };
  }
}
