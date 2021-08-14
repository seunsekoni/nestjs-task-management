import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		return this.usersRepository.createUser(authCredentialsDto);
	}
}
