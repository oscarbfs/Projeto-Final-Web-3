export class SetResponseMapper {
    responseId?: String;
    responseActivityId?: String;
    responseClassId?: String;
    responseUserId?: String;
    responseUserName?: String;
    responseText?: String;
    responseCreatedAt?: String;
    responseUpdatedAt?: String;
  
    constructor({
      responseId,
      responseActivityId,
      responseClassId,
      responseUserId,
      responseUserName,
      responseText,
      responseCreatedAt,
      responseUpdatedAt,
    }: {
      responseId?: String;
      responseActivityId?: String;
      responseClassId?: String;
      responseUserId?: String;
      responseUserName?: String;
      responseText?: String;
      responseCreatedAt?: String;
      responseUpdatedAt?: String;
    } = {}) {
      this.responseId = responseId;
      this.responseUserId = responseUserId;
      this.responseActivityId = responseActivityId;
      this.responseClassId = responseClassId;
      this.responseUserName = responseUserName;
      this.responseText = responseText;
      this.responseCreatedAt = responseCreatedAt;
      this.responseUpdatedAt = responseUpdatedAt;
    }
  
    mapFromJson(json: any): SetResponseMapper {
        this.responseId = json.id;
        this.responseActivityId = json.activity_id;
        this.responseClassId = json.class_id;
        this.responseUserId = json.user_id;
        this.responseUserName = json.user_name;
        this.responseText = json.response_text;
        this.responseCreatedAt = json.created_at;
        this.responseUpdatedAt = json.updated_at;
        
        return this;
    }
  
    toJson(): any {
      return {
        id: this.responseId,
        activity_id: this.responseActivityId,
        class_id: this.responseClassId,
        user_id: this.responseUserId,
        user_name: this.responseUserName,
        response_text: this.responseText,
        createdAt: this.responseCreatedAt,
        updatedAt: this.responseUpdatedAt,
      };
    }
  }
  