import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../modules/user-auth/public.decorator';
import { PrismaService } from '../database/prisma/prisma.service';

@ApiTags('Health')
@Controller({
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaService: PrismaService,
    private db: PrismaHealthIndicator,
  ) {}

  @Public()
  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('app', process.env.API_ENDPOINT),
      () => this.db.pingCheck('database', this.prismaService),
    ]);
  }

  @Public()
  @Get('ping')
  ping() {
    return 'pong';
  }

  @Public()
  @Get()
  main() {
    return {
      message: 'Welcome to Dracma API!',
      swagger: [
        `${process.env.API_ENDPOINT}/api`,
        `${process.env.API_ENDPOINT}/api-json`,
        `${process.env.API_ENDPOINT}/api-yaml`,
      ],
      routes: global.listAppRoutes,
    };
  }
}
