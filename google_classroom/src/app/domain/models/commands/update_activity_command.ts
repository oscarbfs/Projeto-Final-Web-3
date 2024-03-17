export class UpdateActivityCommand {
  id?: String;
  classId?: String;
  title?: String;
  body?: String;

  constructor(id?: String, classId?: String, title?: String, body?: String) {
    this.id = id;
    this.classId = classId;
    this.title = title;
    this.body = body;
  }

  mapToJson(): any {
    return {
      id: this.id,
      class_id: this.classId,
      title: this.title,
      body: this.body,
    };
  }
}
