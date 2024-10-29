import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        if (response.status) {
          // Enregistrer le token dans le localStorage
          localStorage.setItem('token', response.authorization.token);
          console.log('Login successful:', response);
          // Rediriger vers une page de profil ou tableau de bord
          this.router.navigate(['/profile']); // Remplacez par la route souhaitée
        }
      }, error => {
        console.error('Login error:', error);
      });
    } else {
      this.authService.register(this.registerForm.value).subscribe(response => {
        if (response.status) {
          console.log('Registration successful:', response);
          // Vous pouvez rediriger vers la page de connexion ou vers un tableau de bord
          this.router.navigate(['/auth']); // Remplacez par la route souhaitée
        }
      }, error => {
        console.error('Registration error:', error);
      });
    }
  }
}
