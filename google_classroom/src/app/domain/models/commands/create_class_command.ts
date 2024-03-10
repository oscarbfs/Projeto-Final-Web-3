export class CreateClassCommand {
    name?: String;
    section?: String;
    discipline?: String;
    room?: String;
  
    constructor(name?: String, section?: String, discipline?: String, room?: String) {
      this.name = name;
      this.section = section;
      this.discipline = discipline;
      this.room = room;
    }
  
    mapToJson(): any {
      return {
        name: this.name,
        section: this.section,
        discipline: this.discipline,
        room: this.room,
      };
    }
  }
  