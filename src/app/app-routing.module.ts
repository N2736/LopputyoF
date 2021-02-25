import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Sivu1Component } from './sivu1/sivu1.component';
import { Sivu2Component } from './sivu2/sivu2.component';
import { Sivu3Component } from './sivu3/sivu3.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sivu1', pathMatch: 'full' }, // Juuri uudelleenohjataan sivulle 1
  { path: 'sivu1', component: Sivu1Component },
  { path: 'sivu2', component: Sivu2Component, canActivate: [AuthGuard] },
  { path: 'sivu3', component: Sivu3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
