import bcrypt from 'bcrypt';
import { ApiError } from '../exceptions.js';
import { UserService } from './user.service.js';
import { TokenService } from './token.service.js';

export class AuthService {
  constructor(jwt) {
    this.userService = new UserService();
    this.tokenService = new TokenService(jwt);
  }

  async signUp(input) {
    let candidate;

    const { password, ...payload } = input;

    if (payload.email) {
      candidate = await this.userService.getOne((builder) =>
        builder.where({ email: payload.email }),
      );
    } else {
      candidate = await this.userService.getOne((builder) =>
        builder.where({ phone: payload.phone }),
      );
    }

    if (candidate) {
      throw ApiError.BadRequest(
        `The user with ${
          candidate.phone || candidate.email
        } is already registered`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await this.userService.create({ ...payload, hashPassword });

    return this.tokenService.generateTokens({ id: user.id });
  }

  async signIn(definition) {
    const { email, password } = definition;

    const user = await this.userService.getOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User not exist.');
    }

    const checkPassword = await bcrypt.compare(password, user.hashPassword);

    if (!checkPassword) {
      throw ApiError.BadRequest('Wrong credentials.');
    }

    return this.tokenService.generateTokens({ id: user.id });
  }

  async refresh(user) {
    return this.tokenService.generateTokens({ id: user.id });
  }
}
