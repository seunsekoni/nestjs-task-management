import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signup')
	async signUp(
		@Body() authCredentialsDto: AuthCredentialsDto,
	): Promise<User> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post('/signin')
	async signIn(
		@Body() authCredentialsDto: AuthCredentialsDto,
	): Promise<string> {
		return this.authService.signIn(authCredentialsDto);
	}
}
