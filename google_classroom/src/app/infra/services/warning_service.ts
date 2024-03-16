import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { GetWarningQuery } from '../../domain/models/querys/get_warning_query';
import { SetWarningMapper } from '../../domain/models/mappers/set_warning_mapper';
import { Settings } from '../configs/settings';
import { CreateWarningCommand } from '../../domain/models/commands/create_warning_command';
import { UpdateWarningCommand } from '../../domain/models/commands/update_warning_command';
import { DeleteWarningCommand } from '../../domain/models/commands/delete_warning_command';

@Injectable({
  providedIn: 'root',
})
export class WarningService {

  constructor(private http: HttpClient) {}

  async getClassWarnings(token?: String, classId?: String): Promise<GetWarningQuery> {
    let route = `/warnings/getClassWarnings?class_id=${classId}`;
    try {
      const data = await this.http.get<SetWarningMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetWarningMapper>({ body: data });
      const query = new GetWarningQuery();
      query.mapFromGetClassWarnings(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetWarningQuery();
        query.mapFromGetClassWarnings(response); 
        return query;
      }

      return new GetWarningQuery();
    }
  }

  async create(command: CreateWarningCommand, token: String): Promise<GetWarningQuery> {
    const route = '/warnings/createWarning';

    try {
      const data = await this.http.post<SetWarningMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetWarningMapper>({ body: data });
      const query = new GetWarningQuery();
      query.mapFromCreateUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetWarningQuery();
        query.mapFromCreateUpdateDelete(response); 
        return query;
      }

      return new GetWarningQuery();
    }
  }

  async update(command: UpdateWarningCommand, token: String): Promise<GetWarningQuery> {
    const route = '/warnings/updateWarning';
    
    try {
      const data = await this.http.put(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetWarningQuery();
      query.mapFromCreateUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetWarningQuery();
        query.mapFromCreateUpdateDelete(response); 
        return query;
      }

      return new GetWarningQuery();
    }
  }
  
  async delete(command: DeleteWarningCommand, token: String): Promise<GetWarningQuery> {
    const route = '/warnings/deleteWarning';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        body: command.mapToJson(),
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetWarningQuery();
      query.mapFromCreateUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetWarningQuery();
        query.mapFromCreateUpdateDelete(response); 
        return query;
      }

      return new GetWarningQuery();
    }
  }
}