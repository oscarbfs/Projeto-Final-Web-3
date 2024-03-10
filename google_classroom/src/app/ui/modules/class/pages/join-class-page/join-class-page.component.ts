import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { JoinClassCommand } from '../../../../../domain/models/commands/join_class_command';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';

@Component({
  selector: 'gc-join-class-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './join-class-page.component.html',
  styleUrl: './join-class-page.component.css'
})

export class JoinClassPageComponent {
    
    classData: SetClassMapper | null = null;
    joinClassForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private classBusiness: ClassBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<JoinClassPageComponent>
  ) {
    this.joinClassForm = this.fb.group({
      classId: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.joinClassForm.valid) {
      const classId = this.joinClassForm.value.classId;
      
      const joinClassCommand = new JoinClassCommand(
        classId,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        console.log(token);
        const result = await this.classBusiness.joinClass(joinClassCommand, token);
        console.log(result);

        if (result) {
          this.closeForm();
        } else {
          throw Error("Erro ao entrar na turma. Por favor, tente novamente mais tarde.")
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
