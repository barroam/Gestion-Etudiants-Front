import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UesService } from '../../../Services/Ues/ues.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-ues',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-ues.component.html',
  styleUrl: './list-ues.component.css'
})
export class ListUesComponent implements OnInit {
  ues: any[] = [];

  constructor(private uesService: UesService) {}

  ngOnInit(): void {
    this.loadUes();
  }

  loadUes(): void {
    this.uesService.getUes().subscribe((response) => {
      this.ues = response.data;
    });
  }

  deleteUe(id: number): void {
    this.uesService.deleteUe(id).subscribe(() => {
      this.loadUes();
    });
  }
}
