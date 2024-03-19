export class UpdateActivityCommand {
  id?: String;
  title?: String;
  body?: String;

  constructor(id?: String, classId?: String, title?: String, body?: String) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  mapToJson(): any {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
    };
  }
}
