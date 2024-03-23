import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { GetActivityQuery } from '../../domain/models/querys/get_activity_query';
import { SetActivityMapper } from '../../domain/models/mappers/set_activity_mapper';
import { Settings } from '../configs/settings';
import { CreateActivityCommand } from '../../domain/models/commands/create_activity_command';
import { UpdateActivityCommand } from '../../domain/models/commands/update_activity_command';
import { DeleteActivityCommand } from '../../domain/models/commands/delete_activity_command';
import { CreateResponseActivityCommand } from '../../domain/models/commands/create_response_activity_command';
import { UpdateResponseActivityCommand } from '../../domain/models/commands/update_response_activity_command';
import { DeleteResponseActivityCommand } from '../../domain/models/commands/delete_response_activity_command';
import { SetResponseMapper } from '../../domain/models/mappers/set_response_activity_mapper';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  constructor(private http: HttpClient) {}

  async getClassActivitys(token?: String, classId?: String): Promise<GetActivityQuery> {
    let route = `/activitys/getClassActivitys?class_id=${classId}`;
    try {
      const data = await this.http.get<SetActivityMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetActivityMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromGetClassActivitys(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromGetClassActivitys(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async getActivity(token?: String, activityId?: String): Promise<GetActivityQuery> {
    let route = `/activitys/getActivity?id=${activityId}`;
    try {
      const data = await this.http.get<SetActivityMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetActivityMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateGetDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateGetDelete(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async create(command: CreateActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/createActivity';

    try {
      const data = await this.http.post<SetActivityMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetActivityMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateGetDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateGetDelete(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async update(command: UpdateActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/updateActivity';
    
    try {
      const data = await this.http.put(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateGetDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateGetDelete(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }
  
  async delete(command: DeleteActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/deleteActivity';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        body: command.mapToJson(),
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateGetDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateGetDelete(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async getResponsesActivity(token?: String, activityId?: String): Promise<GetActivityQuery> {
    let route = `/activitys/getResponsesActivity?activity_id=${activityId}`;
    try {
      const data = await this.http.get<SetResponseMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();
      
      const response = new HttpResponse<SetResponseMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromGetActivityResponses(response);
      
      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromGetActivityResponses(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async getResponseActivity(token?: String, responseId?: String): Promise<GetActivityQuery> {
    let route = `/activitys/getResponseActivity?response_id=${responseId}`;
    try {
      const data = await this.http.get<SetResponseMapper>(`${Settings.applicationEndPoint}${route}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();
      
      const response = new HttpResponse<SetResponseMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromGetActivityResponse(response);
      
      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromGetActivityResponse(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async createResponse(command: CreateResponseActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/addResponse';

    try {
      const data = await this.http.post<SetResponseMapper>(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse<SetResponseMapper>({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateDeleteResponse(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateDeleteResponse(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async updateResponse(command: UpdateResponseActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/updateResponse';
    
    try {
      const data = await this.http.put(`${Settings.applicationEndPoint}${route}`, command.mapToJson(), {
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateDeleteResponse(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateDeleteResponse(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }

  async deleteResponse(command: DeleteResponseActivityCommand, token: String): Promise<GetActivityQuery> {
    const route = '/activitys/deleteResponse';
    
    try {
      const data = await this.http.delete(`${Settings.applicationEndPoint}${route}`, {
        body: command.mapToJson(),
        headers: { 'Authorization': `Bearer ${token}` }
      }).toPromise();

      const response = new HttpResponse({ body: data });
      const query = new GetActivityQuery();
      query.mapFromCreateUpdateGetDelete(response);

      return query;
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const response = new HttpResponse({ body: error.error, status: error.status, statusText: error.statusText });
        const query = new GetActivityQuery();
        query.mapFromCreateUpdateGetDelete(response); 
        return query;
      }

      return new GetActivityQuery();
    }
  }
}