export class SignupCommand {
    name?: string;
    email?: string;
    password?: string;
  
    constructor({ name, email, password }: { name?: string; email?: string; password?: string } = {}) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    toJson(): any {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
      };
    }
  }
  