// src/app/login.ts
import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Iniciar sesión</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Usuario" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <p *ngIf="error" style="color: red">{{ error }}</p>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const session = localStorage.getItem('session');
      if (session) {
        this.router.navigate(['/home']);
      }
    }
  }

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('session', 'true');
      }
      this.router.navigate(['/home']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
