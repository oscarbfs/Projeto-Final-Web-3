import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteResponseActivityCommand } from '../../../../../domain/models/commands/delete_response_activity_command';

@Component({
  selector: 'gc-delete-response-activity-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-response-activity-page.component.html',
  styleUrl: './delete-response-activity-page.component.css'
})
export class DeleteResponseActivityPageComponent {
  
  responseId: String = "";
  errorMessage: String | null = null;
  
  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    private dialogRef: MatDialogRef<DeleteResponseActivityPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.responseId = data.responseId;
  }

  async onDelete() {
    this.errorMessage = null;
      
    const deleteResponseActivityCommand = new DeleteResponseActivityCommand(
      this.responseId,
    );

    try {
      var token = await this.authBusiness.getAuthToken();
      const result = await this.activityBusiness.deleterResponse(deleteResponseActivityCommand, token);

      if (result) {
        this.dialogRef.close(true);
      } else {
        throw Error("Erro ao deletar resposta. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
