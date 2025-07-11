// src/app/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Agenda Clínica Dental</h1>
    <button (click)="logout()">Cerrar sesión</button>

    <form (ngSubmit)="agregarTurno()">
      <input type="text" [(ngModel)]="nombrePaciente" name="nombre" placeholder="Nombre del paciente" required />
      <input type="datetime-local" [(ngModel)]="fechaTurno" name="fecha" required />
      <button type="submit">Agregar turno</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Fecha</th>
          <th>Asistió</th>
          <th>Pagó</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let turno of turnos">
          <td>{{ turno.nombre }}</td>
          <td>{{ turno.fecha }}</td>
          <td><input type="checkbox" /></td>
          <td><input type="checkbox" /></td>
        </tr>
      </tbody>
    </table>
  `,
})
export class HomeComponent {
  nombrePaciente = '';
  fechaTurno = '';
  turnos: { nombre: string; fecha: string }[] = [];

  constructor(private router: Router) {
    const session = localStorage.getItem('session');
    if (!session) {
      this.router.navigate(['/']);
    }
  }

  agregarTurno() {
    if (this.nombrePaciente && this.fechaTurno) {
      this.turnos.push({ nombre: this.nombrePaciente, fecha: this.fechaTurno.replace('T', ' ') });
      this.nombrePaciente = '';
      this.fechaTurno = '';
    }
  }

  logout() {
    localStorage.removeItem('session');
    this.router.navigate(['/']);
  }
}
