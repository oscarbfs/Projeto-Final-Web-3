import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteClassCommand } from '../../../../../domain/models/commands/delete_class_command';

@Component({
  selector: 'gc-delete-class-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-class-page.component.html',
  styleUrl: './delete-class-page.component.css'
})
export class DeleteClassPageComponent {
  
  classId: String = "";
  deleteClassForm: FormGroup;
  errorMessage: String | null = null;
  
  constructor(
    private fb: FormBuilder,
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private dialogRef: MatDialogRef<DeleteClassPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injetando os dados da turma
  ) {
    this.classId = data.classId;
    
    this.deleteClassForm = this.fb.group({
      name: [data.className || '', Validators.required], // Use os dados da turma para preencher os campos do formulário
      section: [data.classSection || ''],
      discipline: [data.classDiscipline || ''],
      room: [data.classRoom || '']
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.deleteClassForm.valid) {
      
      const deleteClassCommand = new DeleteClassCommand(
        this.classId,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.classBusiness.deleteClass(deleteClassCommand, token);

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
