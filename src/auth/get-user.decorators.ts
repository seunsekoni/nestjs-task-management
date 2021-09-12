import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUserDetails = createParamDecorator(
	(data, context: ExecutionContext): User => {
		const req = context.switchToHttp().getRequest();
		return req.user;
	},
);
