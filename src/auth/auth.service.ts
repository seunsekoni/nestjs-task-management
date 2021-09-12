import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		return this.usersRepository.createUser(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = await this.usersRepository.findOne({ username });

		if (user && (await bcryptjs.compare(password, user.password))) {
			return 'Success';
		} else {
			throw new UnauthorizedException('Invalid login credentials');
		}
	}
}
