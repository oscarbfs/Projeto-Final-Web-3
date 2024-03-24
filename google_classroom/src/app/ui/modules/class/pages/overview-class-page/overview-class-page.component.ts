import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ClassBusiness } from '../../../../business/class_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';
import { CardClassTileComponent } from '../../tiles/card-class-tile/card-class-tile.component';
import { CreateClassPageComponent } from '../create-class-page/create-class-page.component';
import { JoinClassPageComponent } from '../join-class-page/join-class-page.component';

@Component({
  selector: 'gc-overview-class-page',
  templateUrl: './overview-class-page.component.html',
  styleUrls: ['./overview-class-page.component.css'],
  standalone: true,
  imports: [CommonModule, CardClassTileComponent]
})
export class OverviewClassPageComponent implements OnInit {
  errorMessage: String | null = null;
  loadedClasses: SetClassMapper[] | any[] = [];

  constructor(
    private classBusiness: ClassBusiness,
    private authBusiness: AuthBusiness,
    private router: Router,
    public dialog: MatDialog,
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
      this.errorMessage = error.message;
    }
  }

  async openCreateClassForm(): Promise<void> {
    const dialogRef = this.dialog.open(CreateClassPageComponent, {
      width: '500px', 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadClasses();
    });
  }
  
  async openJoinClassForm(): Promise<void> {
    const dialogRef = this.dialog.open(JoinClassPageComponent, {
      width: '500px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadClasses();
    });
  }

  async goLogout(): Promise<void> {
    const token = await this.authBusiness.getAuthToken();
    const logoutComplete = await this.authBusiness.logout(token);
    
    if(logoutComplete) {
      this.router.navigate(['']);
    }
  }
}
