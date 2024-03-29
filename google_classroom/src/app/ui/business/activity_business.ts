import { Injectable } from '@angular/core';
import { ActivityService } from '../../infra/services/activity_service';
import { SetActivityMapper } from '../../domain/models/mappers/set_activity_mapper';
import { CreateActivityCommand } from '../../domain/models/commands/create_activity_command';
import { UpdateActivityCommand } from '../../domain/models/commands/update_activity_command';
import { DeleteActivityCommand } from '../../domain/models/commands/delete_activity_command';
import { CreateResponseActivityCommand } from '../../domain/models/commands/create_response_activity_command';
import { UpdateResponseActivityCommand } from '../../domain/models/commands/update_response_activity_command';
import { DeleteResponseActivityCommand } from '../../domain/models/commands/delete_response_activity_command';
import { SetResponseMapper } from '../../domain/models/mappers/set_response_activity_mapper';

@Injectable({
  providedIn: 'root'
})
export class ActivityBusiness {
  constructor(private activityService: ActivityService) {}

  async getClassActivitys(token?: String, classId?: String): Promise<SetActivityMapper[]> {
    try {
        const result = await this.activityService.getClassActivitys(token, classId);
        if (result.success) {
            return result.activitys!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async getActivity(token?: String, activityId?: String): Promise<SetActivityMapper> {
    try {
        const result = await this.activityService.getActivity(token, activityId);
        if (result.success) {
            return result.activity!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async createActivity(command: CreateActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.create(command, token);
        if (result.success && result.activity) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async updateActivity(command: UpdateActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.update(command, token);
        if (result.success && result.activity) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async deleteActivity(command: DeleteActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.delete(command, token);
        if (result.success) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async getResponsesActivity(token?: String, activityId?: String): Promise<SetResponseMapper[]> {
    try {
        const result = await this.activityService.getResponsesActivity(token, activityId);
        if (result.success) {
            return result.responses!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async getResponseActivity(token?: String, responseId?: String): Promise<SetResponseMapper> {
    try {
        const result = await this.activityService.getResponseActivity(token, responseId);
        if (result.success) {
            return result.response!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async createResponse(command: CreateResponseActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.createResponse(command, token);
        if (result.success) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async updateResponse(command: UpdateResponseActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.updateResponse(command, token);
        if (result.success) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async deleterResponse(command: DeleteResponseActivityCommand, token: String): Promise<boolean> {
    try {
        const result = await this.activityService.deleteResponse(command, token);
        if (result.success) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }
}
