import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';
import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { DeleteClassCommand } from '../../../../../domain/models/commands/delete_class_command';

@Component({
  selector: 'gc-detail-class-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-class-page.component.html',
  styleUrl: './detail-class-page.component.css'
})
export class DetailClassPageComponent {
  errorMessage: String | null = null;
  classToDetail: SetClassMapper | null = null;
  userIsCreator: boolean = false;

  constructor(
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    var classId: String = "";
    this.route.paramMap.subscribe(params => {
      classId = params.get('id')??"";
    });

    this.getClass(classId);
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

  async deleteClass() {
    try {
        const token = await this.authBusiness.getAuthToken();

        const deleteClassCommand = new DeleteClassCommand(
          this.classToDetail?.classId,
        );

        await this.classBusiness.deleteClass(deleteClassCommand, token);
        // Redirecione para uma página após a exclusão
    } catch (error: any) {
        this.errorMessage = error.message;
    }
  }

  editClass() {
      // Implemente a lógica para redirecionar para a página de edição da turma
  }

  async leaveClass() {
      try {
          const token = await this.authBusiness.getAuthToken();
          // await this.classBusiness.leaveClass(token, this.classToDetail?.classId);
          // Redirecione para uma página após sair da turma
      } catch (error: any) {
          this.errorMessage = error.message;
      }
  }

}
