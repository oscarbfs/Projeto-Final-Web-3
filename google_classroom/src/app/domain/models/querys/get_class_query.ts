import { HttpResponse } from '@angular/common/http';

import { SetClassMapper } from '../mappers/set_class_mapper';

export class GetClassQuery {
  classes?: [SetClassMapper];
  class?: SetClassMapper;
  status?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: string | null;

  mapFromSearch(response: HttpResponse<any>): GetClassQuery {
    try {
      const data = response.body;
      
      this.classes = data.map((classJson: any) => {
        return new SetClassMapper().mapFromJson(classJson);
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

  mapFromCreateGetClassUpdateDelete(response: HttpResponse<any>): GetClassQuery {
    try {
      const data = response.body;
      
      this.class = new SetClassMapper();
      this.class.mapFromJson(data);
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
