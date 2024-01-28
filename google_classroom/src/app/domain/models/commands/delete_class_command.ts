export class DeleteClassCommand {
    id?: String;
  
    constructor(id?: String) {
      this.id = id;
    }
  
    mapToJson(): any {
        return {
          name: this.id,
        };
    }
  }
  