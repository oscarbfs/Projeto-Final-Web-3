export class DeleteResponseActivityCommand {
    responseId?: String;
  
    constructor(responseId?: String) {
      this.responseId = responseId;
    }
  
    mapToJson(): any {
      return {
        response_id: this.responseId,
      };
    }
  }
  