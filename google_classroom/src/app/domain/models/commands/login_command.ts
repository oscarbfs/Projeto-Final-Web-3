export class LoginCommand {
  userEmail: string;
  userPassword: string;

  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }

  mapToJson(): { userEmail: string; userPassword: string } {
    return {
      userEmail: this.userEmail,
      userPassword: this.userPassword
    };
  }
}
