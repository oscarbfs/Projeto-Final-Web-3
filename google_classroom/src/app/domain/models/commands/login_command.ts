export class LoginCommand {
  email: String;
  password: String;

  constructor(email: String, password: String) {
    this.email = email;
    this.password = password;
  }

  mapToJson(): { email: String; password: String } {
    return {
      email: this.email,
      password: this.password
    };
  }
}
