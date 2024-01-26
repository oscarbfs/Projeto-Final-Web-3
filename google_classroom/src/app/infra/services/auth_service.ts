import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
export class AuthService {

  constructor(private http: HttpClient) {}

  async login(command: LoginCommand): Promise<GetAuthQuery> {
    const route = '/auth/login';

    try {
      const data = await this.http.post<SetAuthMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson()).toPromise();

      const response = new HttpResponse<SetAuthMapper>({ body: data });
      const query = new GetAuthQuery();
      query.mapFromLogin(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetAuthQuery();
        query.mapFromLogin(response); 
        return query;
      }

      return new GetAuthQuery();
    }
  }
  
  async logout(token: string): Promise<GetAuthQuery> {
    const route = '/auth/logout';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetAuthQuery();
      query.mapFromLogin(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetAuthQuery();
        query.mapFromLogin(response); 
        return query;
      }

      return new GetAuthQuery();
    }
  }
  
  async checkToken(token: string): Promise<GetAuthQuery> {
    const route = '/users/checkToken';
    
    try {
      const data = await this.http.get(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetAuthQuery();
      query.mapFromLogin(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetAuthQuery();
        query.mapFromLogin(response); 
        return query;
      }

      return new GetAuthQuery();
    }
  }
}