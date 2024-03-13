import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { CreateClassCommand } from '../../../../../domain/models/commands/create_class_command';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';

@Component({
  selector: 'gc-create-class-page',
  standalone: true,
  templateUrl: './create-class-page.component.html',
  styleUrl: './create-class-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateClassPageComponent {
    
    classData: SetClassMapper | null = null;
    createClassForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private classBusiness: ClassBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<CreateClassPageComponent>
  ) {
    this.createClassForm = this.fb.group({
      name: ['', Validators.required],
      section: [''], // Adicione os campos section, discipline e room aqui
      discipline: [''],
      room: ['']
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.createClassForm.valid) {
      const name = this.createClassForm.value.name;
      const section = this.createClassForm.value.section;
      const discipline = this.createClassForm.value.discipline;
      const room = this.createClassForm.value.room;
      
      const createClassCommand = new CreateClassCommand(
        name,
        section,
        discipline,
        room,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.classBusiness.createClass(createClassCommand, token);

        if (result) {
          this.closeForm();
        } else {
          throw Error("Erro ao criar turma. Por favor, tente novamente mais tarde.")
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
