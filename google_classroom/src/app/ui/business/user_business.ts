import { Injectable } from '@angular/core';
import { UserService } from '../../infra/services/user_service';
import { SetUserMapper } from '../../domain/models/mappers/set_user_mapper';
import { CreateUserCommand } from '../../domain/models/commands/create_user_command';
import { UpdateUserCommand } from '../../domain/models/commands/update_user_command';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserBusiness {
  constructor(private userService: UserService) {}

  async searchUsers(token: String): Promise<[SetUserMapper]> {
    try {
      const result = await this.userService.search(token);
      if (result.success) {
        return result.users!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }

  async getUser(token: String): Promise<SetUserMapper> {
    try {
      const result = await this.userService.getUser(token);
      if (result.success) {
        return result.user!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }

  async createUser(command: CreateUserCommand): Promise<boolean> {
    try {
      const result = await this.userService.create(command);
      if (result.success && result.user) {
        return true;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }

  async updateUser(command: UpdateUserCommand, token: string): Promise<boolean> {
    try {
      const result = await this.userService.update(command, token);
      if (result.success && result.user) {
        return true;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }

  async deleteUser(token: string): Promise<boolean> {
    try {
      const result = await this.userService.delete(token);
      if (result.success) {
        return true;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }
}
