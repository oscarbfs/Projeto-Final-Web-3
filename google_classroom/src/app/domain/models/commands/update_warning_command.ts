export class UpdateWarningCommand {
    id?: String;
    message?: String;
  
    constructor(id?: String, message?: String) {
      this.id = id;
      this.message = message;
    }
  
    mapToJson(): any {
      return {
        id: this.id,
        message: this.message,
      };
    }
  }
  