import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async verifyUser(email: string, password: string) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
