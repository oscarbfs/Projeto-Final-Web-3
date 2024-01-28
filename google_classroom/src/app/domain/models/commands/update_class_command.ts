export class UpdateClassCommand {
    id?: String;
    name?: String;
    section?: String;
    discipline?: String;
    room?: String;
  
    constructor(id?: String, name?: String, section?: String, discipline?: String, room?: String) {
      this.id = id;
      this.name = name;
      this.section = section;
      this.discipline = discipline;
      this.room = room;
    }
  
    mapToJson(): any {
      const json: any = {};
  
      json.id = this.id;

      if (this.name !== undefined && this.name !== null) {
        json.name = this.name;
      }
  
      if (this.section !== undefined && this.section !== null) {
        json.section = this.section;
      }
  
      if (this.discipline !== undefined && this.discipline !== null) {
        json.discipline = this.discipline;
      }

      if (this.room !== undefined && this.room !== null) {
        json.room = this.room;
      }
  
      return json;
    }
  }
  