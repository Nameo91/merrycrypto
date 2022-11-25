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
import { SearchComponent } from './components/search/search.component';


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
    SearchComponent
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
    MatTooltipModule
  ]
})
export class PublicModule { }
