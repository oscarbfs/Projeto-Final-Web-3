export class SetUserMapper {
    userId?: String;
    userName?: String;
    userEmail?: String;
    userPassword?: String;
  
    constructor({
      userId,
      userName,
      userEmail,
      userPassword,
    }: {
      userId?: String;
      userName?: String;
      userEmail?: String;
      userPassword?: String;
    } = {}) {
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.userPassword = userPassword;
    }
  
    mapFromJson(json: any): SetUserMapper {
      this.userId = json['id'];
      this.userName = json['name'];
      this.userEmail = json['email'];
      this.userPassword = json['password'];

      return this;
    }
  
    toJson(): any {
      return {
        id: this.userId,
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
      };
    }
  }
  