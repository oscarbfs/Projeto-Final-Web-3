import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WarningBusiness } from '../../../../business/warning_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateWarningCommand } from '../../../../../domain/models/commands/update_warning_command';

@Component({
  selector: 'gc-update-warning-page',
  standalone: true,
  templateUrl: './update-warning-page.component.html',
  styleUrl: './update-warning-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class UpdateWarningPageComponent {
    
    updateWarningForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private warningBusiness: WarningBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<UpdateWarningPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateWarningForm = this.fb.group({
      id: [data.id || ''],
      message: [data.message || '', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.updateWarningForm.valid) {
      const id = this.updateWarningForm.value.id;
      const message = this.updateWarningForm.value.message;
      
      const updateWarningCommand = new UpdateWarningCommand(
        id,
        message,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.warningBusiness.updateWarning(updateWarningCommand, token);

        if (result) {
          this.closeForm();
        } else {
          throw Error("Erro ao editar aviso. Por favor, tente novamente mais tarde.")
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
