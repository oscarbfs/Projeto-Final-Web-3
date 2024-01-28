import { SetUserMapper } from "./set_user_mapper";

export class SetClassMapper {
    classId?: string;
    className?: string;
    classSection?: string;
    classDiscipline?: string;
    classRoom?: string;
    classCreator?: SetUserMapper;
    classCreatedAt?: string;
    classUpdatedAt?: string;
  
    constructor({
      classId,
      className,
      classSection,
      classDiscipline,
      classRoom,
      classCreator,
      classCreatedAt,
      classUpdatedAt,
    }: {
      classId?: string;
      className?: string;
      classSection?: string;
      classDiscipline?: string;
      classRoom?: string;
      classCreator?: SetUserMapper;
      classCreatedAt?: string;
      classUpdatedAt?: string;
    } = {}) {
      this.classId = classId;
      this.className = className;
      this.classSection = classSection;
      this.classDiscipline = classDiscipline;
      this.classRoom = classRoom;
      this.classCreator = classCreator;
      this.classCreatedAt = classCreatedAt;
      this.classUpdatedAt = classUpdatedAt;
    }
  
    mapFromJson(json: any): SetClassMapper {
        this.classId = json.id;
        this.className = json.name;
        this.classSection = json.section;
        this.classDiscipline = json.discipline;
        this.classRoom = json.room;
        this.classCreator = new SetUserMapper().mapFromJson(json.creator);
        this.classCreatedAt = json.createdAt;
        this.classUpdatedAt = json.updatedAt;
        
        return this;
    }
  
    toJson(): any {
      return {
        id: this.classId,
        name: this.className,
        section: this.classSection,
        discipline: this.classDiscipline,
        room: this.classRoom,
        creator: this.classCreator,
        createdAt: this.classCreatedAt,
        updatedAt: this.classUpdatedAt,
      };
    }
  }
  