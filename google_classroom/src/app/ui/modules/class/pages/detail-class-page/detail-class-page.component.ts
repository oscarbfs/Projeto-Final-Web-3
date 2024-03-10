import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';
import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';

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
        this.classToDetail = classToDetail; 
      } else {
        throw Error("Erro ao carregar turmas. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      console.error('Failed to load classes:', error.message);
      this.errorMessage = error.message;
      this.router.navigate(['/']);
    }
  }
}
