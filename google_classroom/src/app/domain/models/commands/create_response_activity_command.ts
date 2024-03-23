export class CreateResponseActivityCommand {
  activityId?: String;
  responseText?: String;

  constructor(activityId?: String, responseText?: String) {
    this.activityId = activityId;
    this.responseText = responseText;
  }

  mapToJson(): any {
    return {
      activity_id: this.activityId,
      response_text: this.responseText,
    };
  }
}
