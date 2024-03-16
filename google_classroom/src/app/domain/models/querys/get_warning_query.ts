import { HttpResponse } from '@angular/common/http';

import { SetWarningMapper } from '../mappers/set_warning_mapper';

export class GetWarningQuery {
  warnings?: [SetWarningMapper];
  warning?: SetWarningMapper;
  status?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: String | null;

  mapFromGetClassWarnings(response: HttpResponse<any>): GetWarningQuery {
    try {
      const data = response.body;
      
      this.warnings = data.map((warningJson: any) => {
        return new SetWarningMapper().mapFromJson(warningJson);
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

  mapFromCreateUpdateDelete(response: HttpResponse<any>): GetWarningQuery {
    try {
      const data = response.body;
      
      this.warning = new SetWarningMapper();
      this.warning.mapFromJson(data);
      this.code = response.status;
      this.success = response.statusText === 'OK';
      this.errorMessage = data.error ?? null;
    } catch (e) {
      this.success = response.statusText === 'OK';
      this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
    }

    return this;
  }

  mapFromJoinLeave(response: HttpResponse<any>): GetWarningQuery {
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
