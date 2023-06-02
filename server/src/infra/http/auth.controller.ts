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
  @Post()
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.login(req.user);

    const refreshToken = await this.generateRefreshTokenUseCase.execute({
      userId: req.user.id,
    });

    res.header('Authorization', tokens.access_token);
    res.header('Refresh-Token', refreshToken);
    return res.send();
  }

  @Post('refresh-token')
  async refreshToken(@Request() req, @Response() res) {
    const { refreshToken, userId } = req.body;
    if (!refreshToken || !userId) {
      return res.status(400).send();
    }
    const { access_token } = await this.authService.refreshToken(
      refreshToken,
      userId,
    );

    const newRefreshToken = await this.generateRefreshTokenUseCase.execute({
      userId,
    });

    res.header('Authorization', access_token);
    res.header('Refresh-Token', newRefreshToken);

    return res.send();
  }
}
