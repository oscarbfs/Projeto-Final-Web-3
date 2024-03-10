import { SetUserMapper } from "./set_user_mapper";

export class SetClassMapper {
    classId?: String;
    className?: String;
    classSection?: String;
    classDiscipline?: String;
    classRoom?: String;
    classCreator?: SetUserMapper;
    classMembers?: SetUserMapper[];
    classCreatedAt?: String;
    classUpdatedAt?: String;
  
    constructor({
      classId,
      className,
      classSection,
      classDiscipline,
      classRoom,
      classCreator,
      classMembers,
      classCreatedAt,
      classUpdatedAt,
    }: {
      classId?: String;
      className?: String;
      classSection?: String;
      classDiscipline?: String;
      classRoom?: String;
      classCreator?: SetUserMapper;
      classMembers?: SetUserMapper[];
      classCreatedAt?: String;
      classUpdatedAt?: String;
    } = {}) {
      this.classId = classId;
      this.className = className;
      this.classSection = classSection;
      this.classDiscipline = classDiscipline;
      this.classRoom = classRoom;
      this.classCreator = classCreator;
      this.classMembers = classMembers;
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
        this.classMembers = json.members?.map((member: any) => new SetUserMapper().mapFromJson(member));
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
        members: this.classMembers,
        createdAt: this.classCreatedAt,
        updatedAt: this.classUpdatedAt,
      };
    }
  }
  