export class UpdateResponseActivityCommand {
  responseId?: String;
  activityId?: String;
  response?: String;

  constructor(responseId?: String, activityId?: String, response?: String) {
    this.responseId = responseId;
    this.activityId = activityId;
    this.response = response;
  }

  mapToJson(): any {
    return {
      response_id: this.responseId,
      activity_id: this.activityId,
      response: this.response,
    };
  }
}
