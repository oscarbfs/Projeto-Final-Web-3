import { Injectable } from '@angular/core';
import { AuthService } from '../../infra/services/auth_service';
import { LoginCommand } from '../../domain/models/commands/login_command';
import { SetAuthMapper } from '../../domain/models/mappers/set_auth_mapper';
import { firstValueFrom } from 'rxjs';
import { GetAuthQuery } from '../../domain/models/querys/get_auth_query';

@Injectable({
  providedIn: 'root'
})
export class AuthBusiness {
  constructor(private authService: AuthService) {}

  async login(command: LoginCommand): Promise<SetAuthMapper> {
    try {
      const result = await this.authService.login(command);
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
      const result = await this.authService.logout(token);
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
      const result = await this.authService.checkToken(token);
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
