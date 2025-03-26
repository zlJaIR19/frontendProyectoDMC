import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenListComponent } from './orden-list/orden-list.component';

const routes: Routes = [
  { path: 'ordenes', component: OrdenListComponent },
  { path: '', redirectTo: 'ordenes', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    OrdenListComponent
  ]
})
export class AdminModule { }
