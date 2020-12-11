import { isUndefined } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from '../../../shared/core/IUseCase';
import { LoginRequest, LoginResponse } from './dto/Login.dto';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';

export class LoginUseCase implements IUseCase<LoginRequest, LoginResponse> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const requestEmail = request.email;

    const foundUser = await this.userRepository.findByEmail(requestEmail);

    if (isUndefined(foundUser)) {
      return {
        ok: false,
        error: `Can not found user of trial email : ${requestEmail}`,
      };
    }

    if (!(await LoginUseCase.checkPassword(request.password, foundUser))) {
      return {
        ok: false,
        error: 'Password is Wrong',
      };
    }

    return {
      ok: true,
      token: this.jwtService.sign({
        id: foundUser.id.toValue().toString(),
        email: foundUser.email.value,
      }),
    };
  }

  private static async checkPassword(
    requestPassword: string,
    user: User,
  ): Promise<boolean> {
    return await bcrypt.compare(requestPassword, user.password.value);
  }
}
