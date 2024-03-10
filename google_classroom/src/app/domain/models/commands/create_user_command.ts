export class CreateUserCommand {
    name?: String;
    email?: String;
    password?: String;
  
    constructor(name?: String, email?: String, password?: String) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    mapToJson(): any {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
      };
    }
  }
  