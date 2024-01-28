export class UpdateUserCommand {
    id?: String;
    name?: String;
    email?: String;
    password?: String;
  
    constructor(id?: String, name?: String, email?: String, password?: String ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    mapToJson(): any {
      const json: any = {};
  
      json.id = this.id;

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
  