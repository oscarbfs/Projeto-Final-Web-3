import { Injectable } from '@angular/core';
import { AuthService } from '../../infra/services/auth_service';
import { LoginCommand } from '../../domain/models/commands/login_command';
import { SetAuthMapper } from '../../domain/models/mappers/set_auth_mapper';

@Injectable({
  providedIn: 'root'
})
export class AuthBusiness {

  constructor(private authService: AuthService) {}
  
  generateExpireDate(isLogout: boolean): String {
    const result = new Date();
    if(!isLogout) result.setDate(result.getDate() + 1);
    return result.toUTCString();
  }

  async login(command: LoginCommand): Promise<SetAuthMapper> {
    try {
      const result = await this.authService.login(command);
      if (result.success) {
        const expireDate = this.generateExpireDate(false);
        document.cookie = `token=${result.auth?.token}; expires=${expireDate}; path=/`;
        return result.auth!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(token: String): Promise<boolean> {
    try {
      const result = await this.authService.logout(token);
      if (result.success) {
        const expireDate = this.generateExpireDate(false);
        document.cookie = `token=; expires=${expireDate}; path=/`;
        return true;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkToken(token: String): Promise<boolean> {
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

  async getUserIdByToken(token: String): Promise<String | undefined | null> {
    try {
      const result = await this.authService.checkToken(token);
      if (result.success) {
        return result.auth?.userId;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAuthToken(): Promise<String> {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if(token) return token;
    throw Error("Token inválido")
  }
}
