import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SetAuthMapper } from '../mappers/set_auth_mapper';

export class GetAuthQuery {
  auth?: SetAuthMapper;
  status?: boolean;
  isValid?: boolean;
  code?: number;
  success?: boolean;
  errorMessage?: string | null;

  constructor(private http: HttpClient) {}

  mapFromLogin(response: HttpResponse<any>): Observable<void> {
    return new Observable<void>(observer => {
      try {
        const data = response.body;

        this.auth = new SetAuthMapper();
        this.auth.mapFromJson(data);
        this.code = response.status;
        this.success = response.statusText === 'OK';
        this.errorMessage = data['error'] ?? null;
        observer.next();
        observer.complete();
      } catch (e) {
        this.success = response.statusText === 'OK';
        this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
        observer.next();
        observer.complete();
      }
    });
  }

  mapFromLogout(response: HttpResponse<any>): Observable<void> {
    return new Observable<void>(observer => {
      try {
        this.status = response.body['status'] === 'Logout successful';
        this.code = response.status;
        this.success = response.statusText === 'OK';
        this.errorMessage = response.body['error'] ?? null;
        observer.next();
        observer.complete();
      } catch (e) {
        this.success = response.statusText === 'OK';
        this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
        observer.next();
        observer.complete();
      }
    });
  }

  mapFromCheckToken(response: HttpResponse<any>): Observable<void> {
    return new Observable<void>(observer => {
      try {
        this.isValid = response.body['isValid'];
        this.code = response.status;
        this.success = response.statusText === 'OK';
        this.errorMessage = response.body['error'] ?? null;
        observer.next();
        observer.complete();
      } catch (e) {
        this.success = response.statusText === 'OK';
        this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
        observer.next();
        observer.complete();
      }
    });
  }

  mapFromJson(json: any): void {
    try {
      this.auth = new SetAuthMapper();
      this.auth.mapFromJson(json);
    } catch (e) {
      this.errorMessage = 'Erro no tratamento dos dados';
    }
  }

  mapFromUserFeatures(response: HttpResponse<any>): Observable<void> {
    return new Observable<void>(observer => {
      try {
        this.code = response.status;
        this.success = response.statusText === 'OK';
        this.errorMessage = response.body['error'] ?? null;
        observer.next();
        observer.complete();
      } catch (e) {
        this.success = response.statusText === 'OK';
        this.errorMessage = this.success ? null : 'Erro no tratamento dos dados da resposta do servidor';
        observer.next();
        observer.complete();
      }
    });
  }
}
