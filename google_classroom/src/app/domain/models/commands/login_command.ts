export class LoginCommand {
    userEmail?: string;
    userPassword?: string;
  
    constructor(userEmail?: string, userPassword?: string) {
      this.userEmail = userEmail;
      this.userPassword = userPassword;
    }
  
    mapToJson(): any {
      return {
        email: this.userEmail,
        password: this.userPassword,
      };
    }
  }
  