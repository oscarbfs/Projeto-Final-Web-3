import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteActivityCommand } from '../../../../../domain/models/commands/delete_activity_command';

@Component({
  selector: 'gc-delete-activity-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-activity-page.component.html',
  styleUrl: './delete-activity-page.component.css'
})
export class DeleteActivityPageComponent {
  
  classId: String = "";
  activityId: String = "";
  errorMessage: String | null = null;
  
  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    private dialogRef: MatDialogRef<DeleteActivityPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    console.log(data)
    this.activityId = data.activityId;
    this.classId = data.cassId;
  }

  async onDelete() {
    this.errorMessage = null;
      
    const deleteActivityCommand = new DeleteActivityCommand(
      this.activityId,
    );

    try {
      var token = await this.authBusiness.getAuthToken();
      const result = await this.activityBusiness.deleteActivity(deleteActivityCommand, token);

      if (result) {
        this.dialogRef.close(true);
        this.router.navigate(['/detailClass', this.classId]);
      } else {
        throw Error("Erro ao deletar atividade. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
