import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { GetClassQuery } from '../../domain/models/querys/get_class_query';
import { SetClassMapper } from '../../domain/models/mappers/set_class_mapper';
import { Settings } from '../configs/settings';
import { CreateClassCommand } from '../../domain/models/commands/create_class_command';
import { UpdateClassCommand } from '../../domain/models/commands/update_class_command';
import { DeleteClassCommand } from '../../domain/models/commands/delete_class_command';
import { JoinClassCommand } from '../../domain/models/commands/join_class_command';
import { LeaveClassCommand } from '../../domain/models/commands/leave_class_command';

@Injectable({
  providedIn: 'root',
})
export class ClassService {

  constructor(private http: HttpClient) {}

  async search(token: String, options?: { name?: String, discipline?: String, section?: String, room?: String, }): Promise<GetClassQuery> {
    let route = `/classes/searchClasses?`;

    if (options?.name) {
      route += `name=${options?.name}&`;
    }
    if (options?.discipline) {
      route += `discipline=${options.discipline}&`;
    }
    if (options?.section) {
      route += `section=${options.section}&`;
    }
    if (options?.room) {
      route += `room=${options.room}&`;
    }

    try {
      const data = await this.http.get<SetClassMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetClassMapper>({ body: data });
      const query = new GetClassQuery();
      query.mapFromSearch(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromSearch(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }

  async getClass(token?: String, classId?: String): Promise<GetClassQuery> {
    let route = '/classes/getClass?';

    if (classId) {
      route += `id=${classId}&`;
    }

    try {
      const data = await this.http.get<SetClassMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetClassMapper>({ body: data });
      const query = new GetClassQuery();
      query.mapFromCreateGetClassUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromCreateGetClassUpdateDelete(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }

  async create(command: CreateClassCommand, token: String): Promise<GetClassQuery> {
    const route = '/classes/createClass';

    try {
      const data = await this.http.post<SetClassMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetClassMapper>({ body: data });
      const query = new GetClassQuery();
      query.mapFromCreateGetClassUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromCreateGetClassUpdateDelete(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }

  async update(command: UpdateClassCommand, token: String): Promise<GetClassQuery> {
    const route = '/classes/updateClass';
    
    try {
      const data = await this.http.put(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetClassQuery();
      query.mapFromCreateGetClassUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromCreateGetClassUpdateDelete(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }
  
  async delete(command: DeleteClassCommand, token: String): Promise<GetClassQuery> {
    const route = '/classes/deleteClass';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        body: command.mapToJson(),
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetClassQuery();
      query.mapFromCreateGetClassUpdateDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromCreateGetClassUpdateDelete(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }

  async join(command: JoinClassCommand, token: String): Promise<GetClassQuery> {
    const route = '/classes/joinClass';

    try {
      const data = await this.http.post<SetClassMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetClassMapper>({ body: data });
      const query = new GetClassQuery();
      query.mapFromJoinLeave(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromJoinLeave(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }

  async leave(command: LeaveClassCommand, token: String): Promise<GetClassQuery> {
    const route = '/classes/leaveClass';

    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        body: command.mapToJson(),
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetClassQuery();
      query.mapFromJoinLeave(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetClassQuery();
        query.mapFromJoinLeave(response); 
        return query;
      }

      return new GetClassQuery();
    }
  }
}