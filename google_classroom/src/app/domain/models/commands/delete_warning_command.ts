export class DeleteWarningCommand {
  id?: String;

  constructor(id?: String) {
    this.id = id;
  }

  mapToJson(): any {
    return {
      id: this.id,
    };
  }
}
