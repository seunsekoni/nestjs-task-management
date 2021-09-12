import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersRepository]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'mySecretToBeMovedOut',
			signOptions: {
				expiresIn: 3600000,
			},
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
