import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifySessionGuard } from './auth/guards/verify-session.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
    canActivate: [VerifySessionGuard],
    canLoad: [VerifySessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
