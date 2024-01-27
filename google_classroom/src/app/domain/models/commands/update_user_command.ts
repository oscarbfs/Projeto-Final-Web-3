export class UpdateUserCommand {
    name?: string;
    email?: string;
    password?: string;
  
    constructor({ name, email, password }: { name?: string; email?: string; password?: string } = {}) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    mapToJson(): any {
      const json: any = {};
  
      if (this.name !== undefined && this.name !== null) {
        json.name = this.name;
      }
  
      if (this.email !== undefined && this.email !== null) {
        json.email = this.email;
      }
  
      if (this.password !== undefined && this.password !== null) {
        json.password = this.password;
      }
  
      return json;
    }
  }
  