export class UpdateResponseActivityCommand {
  responseId?: String;
  responseText?: String;

  constructor(responseId?: String, responseText?: String) {
    this.responseId = responseId;
    this.responseText = responseText;
  }

  mapToJson(): any {
    return {
      response_id: this.responseId,
      response_text: this.responseText,
    };
  }
}
