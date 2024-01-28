import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';
import { CardClassTileComponent } from '../../tiles/card-class-tile/card-class-tile.component';

@Component({
  selector: 'gc-overview-class-page',
  templateUrl: './overview-class-page.component.html',
  styleUrls: ['./overview-class-page.component.css'],
  standalone: true,
  imports: [CommonModule, CardClassTileComponent]
})
export class OverviewClassPageComponent implements OnInit {
  errorMessage: string | null = null;
  loadedClasses: SetClassMapper[] | any[] = []; // Altere o tipo conforme necessário

  constructor(
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  async loadClasses() {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const classes = await this.classBusiness.searchClasses(token);

      if (classes) {
        this.loadedClasses = classes; 
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
