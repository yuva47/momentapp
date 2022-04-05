import { MomentsCreateComponent } from './pages/moments-create/moments-create.component';
import { MomentsListComponent } from './pages/moments-list/moments-list.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'momentList',
    component: MomentsListComponent,
  },
  {
    path: 'moment/:id',
    component: MomentsCreateComponent,
  },
  {
    path: 'moment',
    component: MomentsCreateComponent,
  },
  {
    path: '**',
    redirectTo: 'momentList',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
