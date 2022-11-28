import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoinsService } from 'src/app/services/coins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  isSubmitted = false;
  Crypto: any;
  //coins!: any;
  
  constructor(private coinsService: CoinsService, public fb: FormBuilder, private router: Router) {}
  
  registrationForm = this.fb.group({
    cryptoName: ['', [Validators.required]],
    price: ['', [Validators.required]],
    amount: ['', [Validators.required]]
  });

  ngOnInit(): void { 
    this.loadCoins();
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

  onSubmit(): void { // want to save crypto name, id, price bought and number bought 
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      this.router.navigate(['portfolio'])
    }
  }
}
