import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcryptjs from 'bcryptjs';
import { JwtPayload } from './interface/JwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		private jwtService: JwtService,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		return this.usersRepository.createUser(authCredentialsDto);
	}

	async signIn(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialsDto;
		const user = await this.usersRepository.findOne({ username });

		if (user && (await bcryptjs.compare(password, user.password))) {
			const payload: JwtPayload = { username };
			const accessToken: string = await this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Invalid login credentials');
		}
	}
}
