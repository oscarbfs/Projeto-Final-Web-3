import { Injectable } from '@angular/core';
import { AuthService } from '../../infra/services/auth_service';
import { LoginCommand } from '../../domain/models/commands/login_command';
import { SetAuthMapper } from '../../domain/models/mappers/set_auth_mapper';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthBusinessService {
  constructor(private authService: AuthService) {}

  async login(command: LoginCommand): Promise<SetAuthMapper> {
    try {
      console.log("business, result", this.authService.login(command))
      const result = await firstValueFrom(this.authService.login(command));
      console.log("auth_business, result: ", result)
      if (result.success) {
        return result.auth!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(token: string): Promise<boolean> {
    try {
      const result = await firstValueFrom(this.authService.logout(token));
      if (result.success) {
        return true;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkToken(token: string): Promise<boolean> {
    try {
      const result = await firstValueFrom(this.authService.checkToken(token));
      if (result.success) {
        return result.isValid!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }
}