import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailClassPageComponent } from './class/pages/detail-class-page/detail-class-page.component';

const routes: Routes = [
  { path: 'detail-class-page/:id', component: DetailClassPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
