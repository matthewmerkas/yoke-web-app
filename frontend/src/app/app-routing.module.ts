import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProtectedComponent} from './protected/protected.component';
import {ProtectedGuard} from './protected.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ProtectedGuard]
  },
  { path: '**', redirectTo: '/'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
