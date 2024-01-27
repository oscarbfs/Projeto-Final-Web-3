import { HttpResponse } from '@angular/common/http';

import { SetUserMapper } from '../mappers/set_user_mapper';

export class GetUserQuery {
  users?: [SetUserMapper];
  user?: SetUserMapper;
  status?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: string | null;

  mapFromSearch(response: HttpResponse<any>): GetUserQuery {
    try {
      const data = response.body;
      
      this.users = data.map((userJson: any) => {
        const user = new SetUserMapper();
        return user.mapFromJson(userJson);
      });
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromCreateGetUserUpdateDelete(response: HttpResponse<any>): GetUserQuery {
    try {
      const data = response.body;
      
      this.user = new SetUserMapper();
      this.user.mapFromJson(data);
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }
}
