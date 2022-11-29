import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoinsService } from 'src/app/services/coins.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  isSubmitted = false;
  Crypto: any;
  userId!: number;
  
  constructor(private portfolioService: PortfolioService, private coinsService: CoinsService, public fb: FormBuilder, private router: Router, private authService: AuthenticationService) {}
  
  registrationForm = this.fb.group({
    cryptoName: ['', [Validators.required]],
    price: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  ngOnInit(): void { 
    this.loadCoins();
    this.getUserId();
  } 

  getUserId() {
    this.authService.getUserInfo().subscribe((data) => {
      this.userId = data.id;
    });
  }

  loadCoins() {
    this.coinsService.getCoins().subscribe(coins => {
      this.Crypto = coins;
    });
  };

  changeCrypto(e: any) {
    this.cryptoName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  
  get cryptoName() {
    return this.registrationForm.get('cryptoName');
  }

  cryptoCoin() {
    let coin = JSON.stringify(this.registrationForm.value.cryptoName)
      if (coin[2] == ':') {
        return this.Crypto[parseInt(coin[1]) - 1]
      } else {
        return this.Crypto[parseInt(coin[1] + coin[2])  - 1]
      }
  }

  portfolioData() {
    interface CryptoCoin {
      imgURL: any,
      name: string,
      priceBought: any
      amountBought: any
     }
  
    const newCoin: CryptoCoin = {
      name: this.cryptoCoin().name,
      imgURL: this.cryptoCoin().imageURL,
      priceBought: this.registrationForm.value.price,
      amountBought: this.registrationForm.value.amount
    }
    return newCoin
  }


  onSubmit(): void { // want to save crypto name, id, price bought and number bought 
    this.isSubmitted = true;
    if (this.registrationForm.valid || this.isLoggedIn()) {
      const coin = this.portfolioData()
      this.portfolioService.updatePortfolio(coin, this.userId).subscribe(
      );
      this.router.navigate(['portfolio'])
    } else {
      false;
    }
  }

  private isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}