import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailClassPageComponent } from './class/pages/detail-class-page/detail-class-page.component';
import { OverviewClassTabComponent } from './class/tabs/overview-class-tab/overview-class-tab.component';
import { CardClassTileComponent } from './class/tiles/card-class-tile/card-class-tile.component';
import { NavbarComponent } from './shared/components/tiles/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailClassPageComponent,
    OverviewClassTabComponent,
    CardClassTileComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
