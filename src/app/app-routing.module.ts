import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'inicio1',
    pathMatch: 'full'
  },
  {
    path: 'inicio1',
    loadChildren: () => import('./pages/inicio1/inicio1.module').then( m => m.Inicio1PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'inicio2',
    loadChildren: () => import('./pages/inicio2/inicio2.module').then( m => m.Inicio2PageModule),
    canActivate: [NoIngresadoGuard]
  },
  
  {
    path: 'registro2',
    loadChildren: () => import('./pages/registro2/registro2.module').then( m => m.Registro2PageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'ingreso-p',
    loadChildren: () => import('./pages/ingreso-p/ingreso-p.module').then( m => m.IngresoPPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'mail',
    loadChildren: () => import('./pages/mail/mail.module').then( m => m.MailPageModule),
    canActivate: [NoIngresadoGuard]
  },
 
  {
    path: 'api',
    loadChildren: () => import('./pages/api/api.module').then( m => m.ApiPageModule),
    canActivate: [IngresadoGuard]

  },

  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule),
    canActivate: [IngresadoGuard]

  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
