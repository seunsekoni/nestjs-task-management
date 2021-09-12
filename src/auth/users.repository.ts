import {
	ConflictException,
	InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		const { username, password } = authCredentialsDto;
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = this.create({
			username,
			password: hashedPassword,
		});
		try {
			await this.save(user);
			return user;
		} catch (error) {
			if (error.code === '23505') {
				throw new ConflictException('Username already exist');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}
