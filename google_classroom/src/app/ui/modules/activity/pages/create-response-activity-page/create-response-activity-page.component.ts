import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { CreateResponseActivityCommand } from '../../../../../domain/models/commands/create_response_activity_command';

@Component({
  selector: 'gc-create-response-activity-page',
  standalone: true,
  templateUrl: './create-response-activity-page.component.html',
  styleUrl: './create-response-activity-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateResponseActivityPageComponent {
    
    createActivityForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private activityBusiness: ActivityBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<CreateResponseActivityPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createActivityForm = this.fb.group({
      activityId: [data.activityId || ''],
      response: ['', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.createActivityForm.valid) {
      const activityId = this.createActivityForm.value.activityId;
      const response = this.createActivityForm.value.response;
      
      const createActivityCommand = new CreateResponseActivityCommand(
        activityId,
        response,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.activityBusiness.createResponse(createActivityCommand, token);

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
