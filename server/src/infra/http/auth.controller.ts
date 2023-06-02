import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

import { GenerateRefreshTokenUseCase } from 'src/application/modules/tokens/use-cases/generate-refresh-token';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.login(req.user);

    const refreshToken = await this.generateRefreshTokenUseCase.execute({
      userId: req.user.id,
    });

    return res.status(201).json({
      user: req.user,
      authorization: tokens.access_token,
      refreshToken: refreshToken,
    });
  }

  @Post('refresh-token')
  async refreshToken(@Request() req, @Response() res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send();
    }
    const { access_token, user } = await this.authService.refreshToken(
      refreshToken,
    );

    const newRefreshToken = await this.generateRefreshTokenUseCase.execute({
      userId: user.id,
    });

    return res.status(200).json({
      authorization: access_token,
      refreshToken: newRefreshToken,
      user,
    });
  }
}
