import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WarningBusiness } from '../../../../business/warning_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { CreateWarningCommand } from '../../../../../domain/models/commands/create_warning_command';

@Component({
  selector: 'gc-create-warning-page',
  standalone: true,
  templateUrl: './create-warning-page.component.html',
  styleUrl: './create-warning-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateWarningPageComponent {
    
    createWarningForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private warningBusiness: WarningBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<CreateWarningPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createWarningForm = this.fb.group({
      classId: [data.classId || ''],
      message: ['', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.createWarningForm.valid) {
      const classId = this.createWarningForm.value.classId;
      const message = this.createWarningForm.value.message;
      
      const createWarningCommand = new CreateWarningCommand(
        classId,
        message,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.warningBusiness.createWarning(createWarningCommand, token);

        if (result) {
          this.closeForm();
        } else {
          throw Error("Erro ao criar aviso. Por favor, tente novamente mais tarde.")
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
