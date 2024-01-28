import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { GetUserQuery } from '../../domain/models/querys/get_user_query';
import { SetUserMapper } from '../../domain/models/mappers/set_user_mapper';
import { Settings } from '../configs/settings';
import { CreateUserCommand } from '../../domain/models/commands/create_user_command';
import { UpdateUserCommand } from '../../domain/models/commands/update_user_command';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  async search(token: String): Promise<GetUserQuery> {
    const route = '/users/searchUsers';

    try {
      const data = await this.http.get<SetUserMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetUserMapper>({ body: data });
      const query = new GetUserQuery();
      query.mapFromSearch(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetUserQuery();
        query.mapFromSearch(response); 
        return query;
      }

      return new GetUserQuery();
    }
  }

  async getUser(token: String): Promise<GetUserQuery> {
    const route = '/users/getUser';

    try {
      const data = await this.http.get<SetUserMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetUserMapper>({ body: data });
      const query = new GetUserQuery();
      query.mapFromCreateGetUserUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetUserQuery();
        query.mapFromCreateGetUserUpdateDelete(response); 
        return query;
      }

      return new GetUserQuery();
    }
  }

  async create(command: CreateUserCommand): Promise<GetUserQuery> {
    const route = '/users/createUser';

    try {
      const data = await this.http.post<SetUserMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson()).toPromise();

      const response = new HttpResponse<SetUserMapper>({ body: data });
      const query = new GetUserQuery();
      query.mapFromCreateGetUserUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetUserQuery();
        query.mapFromCreateGetUserUpdateDelete(response); 
        return query;
      }

      return new GetUserQuery();
    }
  }

  async update(command: UpdateUserCommand, token: String): Promise<GetUserQuery> {
    const route = '/users/updateUser';
    
    try {
      const data = await this.http.put(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetUserQuery();
      query.mapFromCreateGetUserUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetUserQuery();
        query.mapFromCreateGetUserUpdateDelete(response); 
        return query;
      }

      return new GetUserQuery();
    }
  }
  
  async delete(token: string): Promise<GetUserQuery> {
    const route = '/users/deleteUser';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetUserQuery();
      query.mapFromCreateGetUserUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetUserQuery();
        query.mapFromCreateGetUserUpdateDelete(response); 
        return query;
      }

      return new GetUserQuery();
    }
  }
}