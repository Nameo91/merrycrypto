import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { RegisterComponent } from 'src/app/public/components/register/register.component';
import { HomepageComponent } from 'src/app/public/components/homepage/homepage.component';
import { NewsComponent } from 'src/app/public/components/news/news.component';
import { ExchangesComponent } from 'src/app/public/components/exchanges/exchanges.component';
import { CoinComponent } from 'src/app/public/components/coin/coin.component';
import { SearchComponent } from 'src/app/public/components/search/search.component';
import { PurchaseFormComponent } from 'src/app/public/components/purchase-form/purchase-form.component';
import { PortfolioComponent } from 'src/app/public/components/portfolio/portfolio.component';
import { WatchlistComponent } from 'src/app/public/components/watchlist/watchlist.component';
import { ErrorPageComponent } from 'src/app/public/components/error-page/error-page.component';

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
  component: ErrorPageComponent,
  pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule {}