import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { RegisterComponent } from 'src/app/public/components/register/register.component';
import { PublicRoutingModule } from 'src/app/public/public-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HomepageComponent } from 'src/app/public/components/homepage/homepage.component';
import { TableComponent } from 'src/app/public/components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CoinComponent } from 'src/app/public/components/coin/coin.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalDataComponent } from 'src/app/public/components/global-data/global-data.component';
import { NewsComponent } from 'src/app/public/components/news/news.component';
import { ExchangesComponent } from 'src/app/public/components/exchanges/exchanges.component';
import { StarComponent } from 'src/app/public/components/star/star.component';
import { LineChartComponent } from 'src/app/public/components/line-chart/line-chart.component';
import { MatChipsModule } from '@angular/material/chips';
import { SearchComponent } from 'src/app/public/components/search/search.component';
import { PurchaseFormComponent } from 'src/app/public/components/purchase-form/purchase-form.component';
import { PortfolioComponent } from 'src/app/public/components/portfolio/portfolio.component';
import { PriceDisplayComponent } from 'src/app/public/components/price-display/price-display.component';
import { PortfolioTableComponent } from 'src/app/public/components/portfolio-table/portfolio-table.component';
import { TotalPortfolioComponent } from 'src/app/public/components/total-portfolio/total-portfolio.component';
import { SnowEffectComponent } from 'src/app/public/components/snow-effect/snow-effect.component';
import { TaggedNewsComponent } from 'src/app/public/components/tagged-news/tagged-news.component';
import { RelatedTweetComponent } from 'src/app/public/components/related-tweet/related-tweet.component';
import { WatchlistComponent } from 'src/app/public/components/watchlist/watchlist.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ErrorPageComponent } from 'src/app/public/components/error-page/error-page.component';

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
    SnowEffectComponent,
    TaggedNewsComponent,
    RelatedTweetComponent,
    WatchlistComponent,
    ErrorPageComponent,
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
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [LineChartComponent]
})
export class PublicModule { }
