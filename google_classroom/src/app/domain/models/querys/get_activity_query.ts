import { HttpResponse } from '@angular/common/http';

import { SetActivityMapper } from '../mappers/set_activity_mapper';

export class GetActivityQuery {
  activitys?: [SetActivityMapper];
  activity?: SetActivityMapper;
  status?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: String | null;

  mapFromGetClassActivitys(response: HttpResponse<any>): GetActivityQuery {
    try {
      const data = response.body;
      
      this.activitys = data.map((activityJson: any) => {
        return new SetActivityMapper().mapFromJson(activityJson);
      });
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      console.log(e)
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromCreateUpdateGetDelete(response: HttpResponse<any>): GetActivityQuery {
    try {
      const data = response.body;
      
      this.activity = new SetActivityMapper();
      this.activity.mapFromJson(data);
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromCreateUpdateResponse(response: HttpResponse<any>): GetActivityQuery {
    try {
      const data = response.body;
      
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
