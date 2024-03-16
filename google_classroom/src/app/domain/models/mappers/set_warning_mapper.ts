import { SetUserMapper } from "./set_user_mapper";

export class SetWarningMapper {
    warningId?: String;
    warningUserId?: String;
    warningUserName?: String;
    warningClassId?: String;
    warningMessage?: String;
    warningCreatedAt?: String;
    warningUpdatedAt?: String;
  
    constructor({
      warningId,
      warningUserId,
      warningUserName,
      warningClassId,
      warningMessage,
      warningCreatedAt,
      warningUpdatedAt,
    }: {
      warningId?: String;
      warningUserId?: String;
      warningUserName?: String;
      warningClassId?: String;
      warningMessage?: String;
      warningCreatedAt?: String;
      warningUpdatedAt?: String;
    } = {}) {
      this.warningId = warningId;
      this.warningUserId = warningUserId;
      this.warningUserName = warningUserName;
      this.warningClassId = warningClassId;
      this.warningMessage = warningMessage;
      this.warningCreatedAt = warningCreatedAt;
      this.warningUpdatedAt = warningUpdatedAt;
    }
  
    mapFromJson(json: any): SetWarningMapper {
        this.warningId = json.id;
        this.warningUserId = json.user_id;
        this.warningUserName = json.user_name;
        this.warningClassId = json.class_id;
        this.warningMessage = json.message;
        this.warningCreatedAt = json.createdAt;
        this.warningUpdatedAt = json.updatedAt;
        
        return this;
    }
  
    toJson(): any {
      return {
        id: this.warningId,
        user_id: this.warningUserId,
        user_name: this.warningUserName,
        class_id: this.warningClassId,
        message: this.warningMessage,
        createdAt: this.warningCreatedAt,
        updatedAt: this.warningUpdatedAt,
      };
    }
  }
  