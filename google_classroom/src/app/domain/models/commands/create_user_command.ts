export class CreateUserCommand {
    name?: string;
    email?: string;
    password?: string;
  
    constructor(name?: string, email?: string, password?: string) {
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
  