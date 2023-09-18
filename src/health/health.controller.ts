import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller({
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('app', process.env.API_ENDPOINT),
    ]);
  }

  @Get('ping')
  ping() {
    return 'pong';
  }

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
