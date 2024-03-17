export class SetActivityMapper {
    activityId?: String;
    activityUserId?: String;
    activityUserName?: String;
    activityClassId?: String;
    activityTitle?: String;
    activityBody?: String;
    activityCreatedAt?: String;
    activityUpdatedAt?: String;
  
    constructor({
      activityId,
      activityUserId,
      activityUserName,
      activityClassId,
      activityTitle,
      activityBody,
      activityCreatedAt,
      activityUpdatedAt,
    }: {
      activityId?: String;
      activityUserId?: String;
      activityUserName?: String;
      activityClassId?: String;
      activityTitle?: String;
      activityBody?: String;
      activityCreatedAt?: String;
      activityUpdatedAt?: String;
    } = {}) {
      this.activityId = activityId;
      this.activityUserId = activityUserId;
      this.activityUserName = activityUserName;
      this.activityClassId = activityClassId;
      this.activityTitle = activityTitle;
      this.activityBody = activityBody;
      this.activityCreatedAt = activityCreatedAt;
      this.activityUpdatedAt = activityUpdatedAt;
    }
  
    mapFromJson(json: any): SetActivityMapper {
        this.activityId = json.id;
        this.activityUserId = json.user_id;
        this.activityUserName = json.user_name;
        this.activityClassId = json.class_id;
        this.activityTitle = json.title;
        this.activityBody = json.body;
        this.activityCreatedAt = json.createdAt;
        this.activityUpdatedAt = json.updatedAt;
        
        return this;
    }
  
    toJson(): any {
      return {
        id: this.activityId,
        user_id: this.activityUserId,
        user_name: this.activityUserName,
        class_id: this.activityClassId,
        title: this.activityTitle,
        body: this.activityBody,
        createdAt: this.activityCreatedAt,
        updatedAt: this.activityUpdatedAt,
      };
    }
  }
  