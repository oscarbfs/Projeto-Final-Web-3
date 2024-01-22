import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LoginCommand } from '../../domain/models/commands/login_command';
import { GetAuthQuery } from '../../domain/models/querys/get_auth_query';
import { SetAuthMapper } from '../../domain/models/mappers/set_auth_mapper';
import { Settings } from '../configs/settings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) {}

  login(command: LoginCommand): Observable<GetAuthQuery> {
    const route = '/users/login';
    
    return this.http.post<SetAuthMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson())
      .pipe(
        map(data => {
          const response = new HttpResponse<SetAuthMapper>({ body: data });
          const query = new GetAuthQuery(this.http);
          query.mapFromLogin(response);
          return query;
        }),
        catchError(error => {
          const response = new HttpResponse({ body: { error: error.error } });
          const query = new GetAuthQuery(this.http);
          query.mapFromLogin(response);
          return throwError(() => [query]);
        })
      );
  }
  
  logout(token: string): Observable<GetAuthQuery> {
    const route = '/users/logout';
    
    return this.http.delete(`${Settings.applicationEndPoint}${route}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .pipe(
        map(data => {
          const response = new HttpResponse({ body: data });
          const query = new GetAuthQuery(this.http);
          query.mapFromLogout(response);
          return query;
        }),
        catchError(error => {
          const response = new HttpResponse({ body: { error: error.error } });
          const query = new GetAuthQuery(this.http);
          query.mapFromLogout(response);
          return throwError(() => [query]);
        })
      );
  }
  
  checkToken(token: string): Observable<GetAuthQuery> {
    const route = '/users/checkToken';
    
    return this.http.get(`${Settings.applicationEndPoint}${route}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .pipe(
        map(data => {
          const response = new HttpResponse({ body: data });
          const query = new GetAuthQuery(this.http);
          query.mapFromCheckToken(response);
          return query;
        }),
        catchError(error => {
          const response = new HttpResponse({ body: { isValid: error.token_valid, error: error.error } });
          const query = new GetAuthQuery(this.http);
          query.mapFromCheckToken(response);
          return throwError(() => [query]);
        })
      );
  }
}