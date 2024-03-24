import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { WarningBusiness } from '../../../../business/warning_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetWarningMapper } from '../../../../../domain/models/mappers/set_warning_mapper';
import { CardWarningTileComponent } from '../../tiles/card-warning-tile/card-warning-tile.component';
import { CreateWarningPageComponent } from '../create-warning-page/create-warning-page.component';

@Component({
  selector: 'gc-overview-warning-page',
  templateUrl: './overview-warning-page.component.html',
  styleUrls: ['./overview-warning-page.component.css'],
  standalone: true,
  imports: [CommonModule, CardWarningTileComponent]
})
export class OverviewWarningPageComponent implements OnInit {
  errorMessage: String | null = null;
  loadedWarnings: SetWarningMapper[] | any[] = [];
  @Input() classId: String | undefined;
  @Input() userId: String | null | undefined;

  constructor(
    private warningBusiness: WarningBusiness,
    private authBusiness: AuthBusiness,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.loadWarninges();
  }

  async loadWarninges() {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const warnings = await this.warningBusiness.getClassWarnings(token, this.classId);

      if (warnings) {
        this.loadedWarnings = warnings; 
      } else {
        throw Error("Erro ao carregar avisos. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async openCreateWarningForm(): Promise<void> {
    const dialogRef = this.dialog.open(CreateWarningPageComponent, {
      width: '500px', 
      data: {
        classId: this.classId,
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadWarninges();
    });
  }
}
