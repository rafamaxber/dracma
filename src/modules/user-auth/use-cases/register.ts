import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashService } from '../../../cripto/hash/hash.service';
import { UserAlreadyExistsException } from '../../../exceptions/user-already-exists-exception';

@Injectable()
export class RegisterUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, nickName } = createUserDto;

    const userAlreadyExists = await this.checkIfUserExists(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }

    const passwordHash = await this.hashService.hash(password);
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: passwordHash,
        firstName,
        lastName,
        nickName,
      },
    });

    return user;
  }

  private async checkIfUserExists(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
