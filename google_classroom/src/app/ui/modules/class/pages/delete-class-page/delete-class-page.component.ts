import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteClassCommand } from '../../../../../domain/models/commands/delete_class_command';

@Component({
  selector: 'gc-delete-class-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-class-page.component.html',
  styleUrl: './delete-class-page.component.css'
})
export class DeleteClassPageComponent {
  
  classId: String = "";
  errorMessage: String | null = null;
  
  constructor(
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private dialogRef: MatDialogRef<DeleteClassPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    this.classId = data.classId;
  }

  async onDelete() {
    this.errorMessage = null;
      
    const deleteClassCommand = new DeleteClassCommand(
      this.classId,
    );

    try {
      var token = await this.authBusiness.getAuthToken();
      const result = await this.classBusiness.deleteClass(deleteClassCommand, token);

      if (result) {
        this.closeForm();
        this.router.navigate(['/classes']);
      } else {
        throw Error("Erro ao deletar turma. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
