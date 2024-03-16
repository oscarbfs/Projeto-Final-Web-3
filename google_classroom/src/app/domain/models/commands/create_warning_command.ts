export class CreateWarningCommand {
    classId?: String;
    message?: String;
  
    constructor(classId?: String, message?: String) {
      this.classId = classId;
      this.message = message;
    }
  
    mapToJson(): any {
      return {
        class_id: this.classId,
        message: this.message,
      };
    }
  }
  