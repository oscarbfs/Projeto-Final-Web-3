export class SetUserMapper {
    userId?: string;
    userName?: string;
    userEmail?: string;
    userPassword?: string;
  
    constructor({
      userId,
      userName,
      userEmail,
      userPassword,
    }: {
      userId?: string;
      userName?: string;
      userEmail?: string;
      userPassword?: string;
    } = {}) {
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.userPassword = userPassword;
    }
  
    mapFromJson(json: any): void {
      this.userId = json['id'];
      this.userName = json['name'];
      this.userEmail = json['email'];
      this.userPassword = json['password'];
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
  