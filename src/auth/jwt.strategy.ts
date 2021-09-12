import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interface/JwtPayload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
	) {
		super({
			secretOrKey: 'mySecretToBeMovedOut',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	/**
	 * Validate the user details and fetch from DB if token is valid.
	 *
	 * @param payload
	 * @returns user
	 */
	async validate(payload: JwtPayload): Promise<User> {
		const { username } = payload;
		const user = await this.usersRepository.findOne({ username });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
