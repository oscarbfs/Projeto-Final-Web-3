import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateClassCommand } from '../../../../../domain/models/commands/update_class_command';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';

@Component({
  selector: 'gc-update-class-page',
  standalone: true,
  templateUrl: './update-class-page.component.html',
  styleUrl: './update-class-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class UpdateClassPageComponent {
    
    classData: SetClassMapper | null = null;
    updateClassForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private classBusiness: ClassBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<UpdateClassPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any // Injetando os dados da turma
  ) {
    this.updateClassForm = this.fb.group({
      name: [data.className || '', Validators.required], // Use os dados da turma para preencher os campos do formulário
      section: [data.classSection || ''],
      discipline: [data.classDiscipline || ''],
      room: [data.classRoom || '']
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.updateClassForm.valid) {
      const name = this.updateClassForm.value.name;
      const section = this.updateClassForm.value.section;
      const discipline = this.updateClassForm.value.discipline;
      const room = this.updateClassForm.value.room;
      
      const updateClassCommand = new UpdateClassCommand(
        name,
        section,
        discipline,
        room,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.classBusiness.updateClass(updateClassCommand, token);

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
