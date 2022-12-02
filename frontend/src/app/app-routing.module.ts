import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { AuthGuard } from 'src/app/guards/auth.guard'

const routes: Routes = [
  {
    path: 'private', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
