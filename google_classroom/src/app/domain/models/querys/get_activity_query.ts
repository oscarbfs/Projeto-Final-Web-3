import { HttpResponse } from '@angular/common/http';

import { SetActivityMapper } from '../mappers/set_activity_mapper';
import { SetResponseMapper } from '../mappers/set_response_activity_mapper';

export class GetActivityQuery {
  activitys?: [SetActivityMapper];
  responses?: [SetResponseMapper];
  response?: SetResponseMapper;
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
  
  mapFromGetActivityResponses(response: HttpResponse<any>): GetActivityQuery {
    try {
      const data = response.body;
      
      this.responses = data.map((responsesJson: any) => {
        return new SetResponseMapper().mapFromJson(responsesJson);
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

  mapFromGetActivityResponse(response: HttpResponse<any>): GetActivityQuery {
    try {
      const data = response.body;
      
      this.response = new SetResponseMapper();
      this.response.mapFromJson(data);
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

  mapFromCreateUpdateDeleteResponse(response: HttpResponse<any>): GetActivityQuery {
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
