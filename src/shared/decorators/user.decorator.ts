import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() !== 'http') return null;
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
