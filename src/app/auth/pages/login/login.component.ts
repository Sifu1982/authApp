import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email: [
      'test1@test.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log(this.miFormulario.value);
    // console.log(this.miFormulario.valid);

    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe((res) => {
      // console.log(res);
      if (res) {
        this.router.navigateByUrl('/dashboard');
      } else {
        //TODO: mostrar mensaje de error
      }
    });
  }
}
