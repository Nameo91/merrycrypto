import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoinsService } from '../../../../app/coins.service'

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  isSubmitted = false;
  Crypto: any;
  //coins!: any;
  
  constructor(private coinsService: CoinsService, public fb: FormBuilder) {}
  
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
      this.Crypto = coins.map((coin: any) => [coin.name, coin.imageURL]);
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

  onSubmit(): void {
    console.log(this.Crypto)
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
