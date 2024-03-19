import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateActivityCommand } from '../../../../../domain/models/commands/update_activity_command';

@Component({
  selector: 'gc-update-activity-page',
  standalone: true,
  templateUrl: './update-activity-page.component.html',
  styleUrl: './update-activity-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class UpdateActivityPageComponent {
    
    updateActivityForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private activityBusiness: ActivityBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<UpdateActivityPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateActivityForm = this.fb.group({
      classId: [data.classId || ''],
      title: [data.activityTitle || '', Validators.required],
      body: [data.activityBody || '', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.updateActivityForm.valid) {
      const classId = this.updateActivityForm.value.classId;
      const title = this.updateActivityForm.value.title;
      const body = this.updateActivityForm.value.body;
      
      const updateActivityCommand = new UpdateActivityCommand(
        classId,
        title,
        body,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.activityBusiness.updateActivity(updateActivityCommand, token);

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
