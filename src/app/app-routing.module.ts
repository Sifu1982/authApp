import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // La configuración useHash, que es por defecto "false", añade "#" al inicio de la ruta, lo que hace que Angular sea más compatible con navegadores viejos o en los lugares en los que yo no pueda cambiar la URL o la forma de llegar a la página index.html
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
