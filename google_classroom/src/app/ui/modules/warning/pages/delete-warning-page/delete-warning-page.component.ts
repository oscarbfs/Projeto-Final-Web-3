import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { WarningBusiness } from '../../../../business/warning_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteWarningCommand } from '../../../../../domain/models/commands/delete_warning_command';

@Component({
  selector: 'gc-delete-warning-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-warning-page.component.html',
  styleUrl: './delete-warning-page.component.css'
})
export class DeleteWarningPageComponent {
  
  warningId: String = "";
  errorMessage: String | null = null;
  
  constructor(
    private warningBusiness: WarningBusiness,
    private authBusiness: AuthBusiness,
    private dialogRef: MatDialogRef<DeleteWarningPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    this.warningId = data.id;
  }

  async onDelete() {
    this.errorMessage = null;
      
    const deleteWarningCommand = new DeleteWarningCommand(
      this.warningId,
    );

    try {
      var token = await this.authBusiness.getAuthToken();
      const result = await this.warningBusiness.deleteWarning(deleteWarningCommand, token);

      if (result) {
        this.closeForm();
        this.router.navigate(['/warninges']);
      } else {
        throw Error("Erro ao deletar aviso. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
