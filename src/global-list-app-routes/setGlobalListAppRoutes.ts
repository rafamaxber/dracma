import { INestApplication } from '@nestjs/common';

export function setGlobalListAppRoutes(app: INestApplication<any>) {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  global.listAppRoutes = router.stack
    .map((routeObj) => {
      const invalidRouteList = [
        '/api/swagger-ui-init.js',
        '/api/api/swagger-ui-init.js',
        '/api-json',
        '/api-yaml',
      ].includes(routeObj.route?.path);

      if (routeObj.route?.path && !invalidRouteList) {
        return {
          route: {
            path: `${process.env.API_ENDPOINT}${routeObj.route?.path}`,
            method: routeObj.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined && item !== null);
}
