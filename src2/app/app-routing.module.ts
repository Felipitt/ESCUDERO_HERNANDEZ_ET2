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
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'ingreso-c',
    loadChildren: () => import('./pages/ingreso-c/ingreso-c.module').then( m => m.IngresoCPageModule),
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
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
