import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateActivityCommand } from '../../../../../domain/models/commands/update_activity_command';

@Component({
  selector: 'gc-update-response-activity-page',
  standalone: true,
  templateUrl: './update-response-activity-page.component.html',
  styleUrl: './update-response-activity-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class UpdateResponseActivityPageComponent {
    
    updateActivityForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private activityBusiness: ActivityBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<UpdateResponseActivityPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateActivityForm = this.fb.group({
      id: [data.id || ''],
      title: [data.title || '', Validators.required],
      body: [data.body || '', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.updateActivityForm.valid) {
      const id = this.updateActivityForm.value.id;
      const title = this.updateActivityForm.value.title;
      const body = this.updateActivityForm.value.body;
      
      const updateActivityCommand = new UpdateActivityCommand(
        id,
        title,
        body,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.activityBusiness.updateActivity(updateActivityCommand, token);

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
