import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NewsComponent } from './components/news/news.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { CoinComponent } from './components/coin/coin.component';
import { SearchComponent } from './components/search/search.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

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
 path: 'new/holding',
  component: PurchaseFormComponent
 },
 {
  path: 'news',
  component: NewsComponent
 },
 {
 path: 'watchlist',
 component: WatchlistComponent
 }, 
 {
  path: 'exchanges',
  component: ExchangesComponent
 }, {
  path: 'portfolio',
  component: PortfolioComponent
 },
 {
  path: 'coins/:id',
  component: CoinComponent
 },
 {
 path: 'search',
 component: SearchComponent
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