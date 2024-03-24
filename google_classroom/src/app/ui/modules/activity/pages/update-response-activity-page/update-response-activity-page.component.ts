import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateResponseActivityCommand } from '../../../../../domain/models/commands/update_response_activity_command';

@Component({
  selector: 'gc-update-response-activity-page',
  standalone: true,
  templateUrl: './update-response-activity-page.component.html',
  styleUrl: './update-response-activity-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class UpdateResponseActivityPageComponent {
    
    updateResponseActivityForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private activityBusiness: ActivityBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<UpdateResponseActivityPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateResponseActivityForm = this.fb.group({
      id: [data.responseId || ''],
      responseText: [data.responseText || '', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.updateResponseActivityForm.valid) {
      const id = this.updateResponseActivityForm.value.id;
      const responseText = this.updateResponseActivityForm.value.responseText;
      
      const updateResponseActivityCommand = new UpdateResponseActivityCommand(
        id,
        responseText,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.activityBusiness.updateResponse(updateResponseActivityCommand, token);

        if (result) {
          this.closeForm();
        } else {
          throw Error("Erro ao editar resposta. Por favor, tente novamente mais tarde.")
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
