import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserType = {
  /**
   * User external id
   * @type {string} - cuid
   * */
  id: string;
  /**
   * Company external id (like tennant id)
   * @type {string} - cuid
   * */
  companyId: string;
  firstName: string;
  lastName: string;
  nickName: string;
  /**
   * JWT issued at
   * */
  iat: number;
  /**
   * JWT expiration time
   * */
  exp: number;
};

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
