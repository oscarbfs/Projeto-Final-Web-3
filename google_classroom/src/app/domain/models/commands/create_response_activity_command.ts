export class CreateResponseActivityCommand {
  activityId?: String;
  response?: String;

  constructor(activityId?: String, response?: String) {
    this.activityId = activityId;
    this.response = response;
  }

  mapToJson(): any {
    return {
      activity_id: this.activityId,
      response: this.response,
    };
  }
}
