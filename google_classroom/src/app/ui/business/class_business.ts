import { Injectable } from '@angular/core';
import { ClassService } from '../../infra/services/class_service';
import { SetClassMapper } from '../../domain/models/mappers/set_class_mapper';
import { CreateClassCommand } from '../../domain/models/commands/create_class_command';
import { UpdateClassCommand } from '../../domain/models/commands/update_class_command';
import { DeleteClassCommand } from '../../domain/models/commands/delete_class_command';
import { JoinClassCommand } from '../../domain/models/commands/join_class_command';
import { LeaveClassCommand } from '../../domain/models/commands/leave_class_command';

@Injectable({
  providedIn: 'root'
})
export class ClassBusiness {
  constructor(private classService: ClassService) {}

  async searchClasses(token: String, options?: { name?: String, discipline?: String, section?: String, room?: String, }): Promise<[SetClassMapper]> {
    try {
        const result = await this.classService.search(
            token,
            {
                name: options?.name,
                discipline: options?.discipline,
                section: options?.section,
                room: options?.room,
            }
        );
      if (result.success) {
        return result.classes!;
      } else {
        throw new Error(`${result.errorMessage}`);
      }
    } catch (error) {
      console.log("error:", error)
      throw error;
    }
  }

  async getClass(token?: String, classId?: String): Promise<SetClassMapper> {
    try {
        const result = await this.classService.getClass(token, classId);
        if (result.success) {
            return result.class!;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async createClass(command: CreateClassCommand, token: String): Promise<boolean> {
    try {
        const result = await this.classService.create(command, token);
        if (result.success && result.class) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async updateClass(command: UpdateClassCommand, token: String): Promise<boolean> {
    try {
        const result = await this.classService.update(command, token);
        if (result.success && result.class) {
            return true;
        } else {
            throw new Error(`${result.errorMessage}`);
        }
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
  }

  async deleteClass(command: DeleteClassCommand, token: String): Promise<boolean> {
    try {
        const result = await this.classService.delete(command, token);
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

  async joinClass(command: JoinClassCommand, token: String): Promise<boolean> {
    try {
        const result = await this.classService.join(command, token);
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

  async leaveClass(command: LeaveClassCommand, token: String): Promise<boolean> {
    try {
        const result = await this.classService.leave(command, token);
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
