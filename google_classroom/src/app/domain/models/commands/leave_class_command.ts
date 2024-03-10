export class LeaveClassCommand {
    classId?: String;
  
    constructor(classId?: String) {
      this.classId = classId;
    }
  
    mapToJson(): any {
      return {
        id: this.classId,
      };
    }
  }
  