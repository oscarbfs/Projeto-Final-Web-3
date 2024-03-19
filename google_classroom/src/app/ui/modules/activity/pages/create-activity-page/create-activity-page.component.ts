import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { CreateActivityCommand } from '../../../../../domain/models/commands/create_activity_command';

@Component({
  selector: 'gc-create-activity-page',
  standalone: true,
  templateUrl: './create-activity-page.component.html',
  styleUrl: './create-activity-page.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateActivityPageComponent {
    
    createActivityForm: FormGroup;
    errorMessage: String | null = null;
    
    constructor(
      private fb: FormBuilder,
      private activityBusiness: ActivityBusiness,
      private authBusiness: AuthBusiness,
      private dialogRef: MatDialogRef<CreateActivityPageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createActivityForm = this.fb.group({
      classId: [data.classId || ''],
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
    
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.createActivityForm.valid) {
      const classId = this.createActivityForm.value.classId;
      const title = this.createActivityForm.value.title;
      const body = this.createActivityForm.value.body;
      
      const createActivityCommand = new CreateActivityCommand(
        classId,
        title,
        body,
      );

      try {
        var token = await this.authBusiness.getAuthToken();
        const result = await this.activityBusiness.createActivity(createActivityCommand, token);

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
