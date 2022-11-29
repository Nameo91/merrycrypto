import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex= /\d/;

    if(regex.test(control.value) && control.value !== null) {
      return null as any;
    } else {
      return {passwordInvalid: true};
    }
  }
  
  static passwordsMatch (control: AbstractControl): ValidationErrors {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirm')?.value;

    if((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return null as any;
    } else {
      return {passwordsNotMatching: true};
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errormessage: any;
  
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  passwordHideOne = true;
  passwordHideTwo = true;

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.registerForm.get('passwordConfirm') as FormControl;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwordConfirm: [null, [Validators.required]]
    }, {
      validators: CustomValidators.passwordsMatch
   })
  }

  onSubmit(){
    if(this.registerForm.invalid) {
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.username;

    this.authService.register("user", email, password, username).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe(
      data => console.log(data),
      error => {
        this.errormessage = error
      }
      );
  }

}
