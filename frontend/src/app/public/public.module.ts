import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicRoutingModule } from './public-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CoinComponent } from './components/coin/coin.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalDataComponent } from './components/global-data/global-data.component';
import { NewsComponent } from './components/news/news.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { StarComponent } from './components/star/star.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MatChipsModule } from '@angular/material/chips';
import { SearchComponent } from './components/search/search.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PriceDisplayComponent } from './components/price-display/price-display.component';
import { PortfolioTableComponent } from './components/portfolio-table/portfolio-table.component';
import { TotalPortfolioComponent } from './components/total-portfolio/total-portfolio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SnowEffectComponent } from './components/snow-effect/snow-effect.component';
import { TaggedNewsComponent } from './components/tagged-news/tagged-news.component';
import { RelatedTweetComponent } from './components/related-tweet/related-tweet.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    TableComponent,
    GlobalDataComponent,
    NewsComponent,
    ExchangesComponent,
    CoinComponent,
    GlobalDataComponent,
    StarComponent,
    LineChartComponent,
    SearchComponent,
    PurchaseFormComponent,
    PortfolioComponent,
    PriceDisplayComponent,
    PortfolioTableComponent,
    TotalPortfolioComponent,
    PageNotFoundComponent,
    SnowEffectComponent,
    TaggedNewsComponent,
    RelatedTweetComponent,
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatProgressBarModule 
  ],
  providers: [LineChartComponent]
})
export class PublicModule { }
