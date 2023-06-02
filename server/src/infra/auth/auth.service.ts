import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeleteRefreshTokenUseCase } from 'src/application/modules/tokens/use-cases/delete-refresh-token';
import { FindRefreshTokenUseCase } from 'src/application/modules/tokens/use-cases/find-refresh-token';
import { GetUserByEmailUseCase } from 'src/application/modules/users/use-cases/get-user-by-email';
import { GetUserByIdUseCase } from 'src/application/modules/users/use-cases/get-user-by-id';
import { comparePassword } from 'src/helpers/Hash';
import { IsExpired } from 'src/helpers/IsExpired';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private findRefreshTokenUseCase: FindRefreshTokenUseCase,
    private deleteRefreshTokenUseCase: DeleteRefreshTokenUseCase,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const { user } = await this.getUserByEmailUseCase.execute({ email });

    if (user && comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(user: any) {
    const payload = {
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async refreshToken(token: string) {
    const refreshToken = await this.findRefreshTokenUseCase.execute({
      id: token,
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (IsExpired(refreshToken.expiresAt)) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const { user } = await this.getUserByIdUseCase.execute({
      id: refreshToken.userId,
    });

    const payload = {
      email: user.email,
    };

    // await this.deleteRefreshTokenUseCase.execute({ id: refreshToken.id });

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
