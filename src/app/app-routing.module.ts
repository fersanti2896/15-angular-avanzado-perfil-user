import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth.routing';
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  /* path: /dashboard -> PagesRoutingModule */
  /* path: /auth -> AuthRoutingModule */
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule,
    RouterModule.forRoot( routes ), 
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
