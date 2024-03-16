import { Injectable } from '@angular/core';
import { WarningService } from '../../infra/services/warning_service';
import { SetWarningMapper } from '../../domain/models/mappers/set_warning_mapper';
import { CreateWarningCommand } from '../../domain/models/commands/create_warning_command';
import { UpdateWarningCommand } from '../../domain/models/commands/update_warning_command';
import { DeleteWarningCommand } from '../../domain/models/commands/delete_warning_command';

@Injectable({
  providedIn: 'root'
})
export class WarningBusiness {
  constructor(private warningService: WarningService) {}

  async getClassWarnings(token?: String, classId?: String): Promise<SetWarningMapper[]> {
    try {
        const result = await this.warningService.getClassWarnings(token, classId);
        if (result.success) {
            return result.warnings!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async createWarning(command: CreateWarningCommand, token: String): Promise<boolean> {
    try {
        const result = await this.warningService.create(command, token);
        if (result.success && result.warning) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async updateWarning(command: UpdateWarningCommand, token: String): Promise<boolean> {
    try {
        const result = await this.warningService.update(command, token);
        if (result.success && result.warning) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async deleteWarning(command: DeleteWarningCommand, token: String): Promise<boolean> {
    try {
        const result = await this.warningService.delete(command, token);
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
