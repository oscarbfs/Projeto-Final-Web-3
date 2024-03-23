export class UpdateResponseActivityCommand {
  responseId?: String;
  activityId?: String;
  responseText?: String;

  constructor(responseId?: String, activityId?: String, responseText?: String) {
    this.responseId = responseId;
    this.activityId = activityId;
    this.responseText = responseText;
  }

  mapToJson(): any {
    return {
      response_id: this.responseId,
      activity_id: this.activityId,
      response_text: this.responseText,
    };
  }
}
