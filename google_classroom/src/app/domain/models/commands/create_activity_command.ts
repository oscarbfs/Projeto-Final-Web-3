export class CreateActivityCommand {
  classId?: String;
  title?: String;
  body?: String;

  constructor(classId?: String, title?: String, body?: String) {
    this.classId = classId;
    this.title = title;
    this.body = body;
  }

  mapToJson(): any {
    return {
      class_id: this.classId,
      title: this.title,
      body: this.body,
    };
  }
}
