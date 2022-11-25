import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NewsComponent } from './components/news/news.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { CoinComponent } from './components/coin/coin.component';

const routes: Routes = [
  {
  path: '',
  component: HomepageComponent
  },
 {
  path: 'login',
  component: LoginComponent
 },
 {
  path: 'register',
  component: RegisterComponent
 },
 {
  path: 'news',
  component: NewsComponent
 },
 {
  path: 'exchanges',
  component: ExchangesComponent
 },
 {
  path: 'coins/:id',
  component: CoinComponent
 },
 {
  path: '**',
  redirectTo: 'login',
  pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule {}