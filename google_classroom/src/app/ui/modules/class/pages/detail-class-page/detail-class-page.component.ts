import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';
import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateClassPageComponent } from '../update-class-page/update-class-page.component';
import { DeleteClassPageComponent } from '../delete-class-page/delete-class-page.component';
import { LeaveClassPageComponent } from '../leave-class-page/leave-class-page.component';

@Component({
  selector: 'gc-detail-class-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule, 
  ],
  templateUrl: './detail-class-page.component.html',
  styleUrl: './detail-class-page.component.css'
})
export class DetailClassPageComponent {
  errorMessage: String | null = null;
  classToDetail: SetClassMapper | null = null;
  userIsCreator: boolean = false;
  classId: String = "";

  constructor(
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private route: ActivatedRoute,
    private router: Router, // Adicione o Router
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id') ?? "";
    });

    this.getClass(this.classId);
  }

  async getClass(classId: String) {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const classToDetail = await this.classBusiness.getClass(token, classId);

      if (classToDetail) {
        this.userIsCreator = await this.authBusiness.getUserIdByToken(token) === classToDetail.classCreator?.userId;
        this.classToDetail = classToDetail;
      } else {
        throw Error("Erro ao carregar turmas. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  openUpdateClassForm(): void {
    const dialogRef = this.dialog.open(UpdateClassPageComponent, {
      width: '500px',
      data: this.classToDetail,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClass(this.classId);
    });
  }

  openDeleteClassDialog(): void {
    this.dialog.open(DeleteClassPageComponent, {
      width: '500px',
      data: this.classToDetail,
    });
  }

  openLeaveClassDialog(): void {
    this.dialog.open(LeaveClassPageComponent, {
      width: '500px',
      data: this.classToDetail,
    });
  }

  goBack(): void {
    this.router.navigate(['/classes']);
  }
}
