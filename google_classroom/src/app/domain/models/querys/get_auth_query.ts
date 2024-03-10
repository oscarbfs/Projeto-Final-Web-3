import { HttpResponse } from '@angular/common/http';

import { SetAuthMapper } from '../mappers/set_auth_mapper';

export class GetAuthQuery {
  auth?: SetAuthMapper;
  status?: boolean;
  isValid?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: String | null;

  mapFromLogin(response: HttpResponse<any>): GetAuthQuery {
    try {
      const data = response.body;
      
      this.auth = new SetAuthMapper().mapFromJson(data);
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromLogout(response: HttpResponse<any>): GetAuthQuery {
    try {
      this.status = response.body['status'] === 'Logout successful';
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = response.body.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromCheckToken(response: HttpResponse<any>): GetAuthQuery {
    try {
      this.isValid = response.body['isValid'];
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = response.body.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromJson(json: any): void {
    try {
      this.auth = new SetAuthMapper();
      this.auth.mapFromJson(json);
    } catch (e) {
      this.errorMessage = 'Erro no tratamento dos dados';
    }
  }
}
