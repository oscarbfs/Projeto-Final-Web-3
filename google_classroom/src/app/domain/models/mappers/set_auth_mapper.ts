export class SetAuthMapper {
    userId?: String;
    userName?: String;
    userEmail?: String;
    userPassword?: String;
    token?: String;
  
    constructor({
      userId,
      userName,
      userEmail,
      userPassword,
      token,
    }: {
      userId?: String;
      userName?: String;
      userEmail?: String;
      userPassword?: String;
      token?: String;
    } = {}) {
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.userPassword = userPassword;
      this.token = token;
    }
  
    mapFromJson(json: any): SetAuthMapper {
      this.userId = json['id'] ?? json['user_id'];
      this.userName = json['name'];
      this.userEmail = json['email'];
      this.userPassword = json['password'];
      this.token = json['token'];

      return this;
    }
  
    updateAuthData(data: SetAuthMapper): SetAuthMapper {
      this.userId = data.userId ?? this.userId;
      this.userName = data.userName ?? this.userName;
      this.userEmail = data.userEmail ?? this.userEmail;
      this.userPassword = data.userPassword ?? this.userPassword;
      this.token = data.token ?? this.token;

      return this;
    }
  
    toJson(): any {
      return {
        id: this.userId,
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        token: this.token,
      };
    }
  
    isEmpty(): boolean {
      return (
        !this.userId &&
        !this.userName &&
        !this.userEmail &&
        !this.userPassword &&
        !this.token
      );
    }
  
    isIncomplete(): boolean {
      return (
        !this.userId ||
        !this.userName ||
        !this.userEmail ||
        !this.userPassword ||
        !this.token
      );
    }
  }
  