import { Component, OnInit } from '@angular/core';
import { MatieresService } from '../../../Services/Matieres/matieres.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-matiere',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-matiere.component.html',
  styleUrl: './list-matiere.component.css'
})
export class ListMatiereComponent implements OnInit {
  matieres: any[] = [];

  constructor(private matieresService: MatieresService) {}

  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres() {
    this.matieresService.getMatieres().subscribe(response => {
      this.matieres = response.data;
    });
  }

  deleteMatiere(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      this.matieresService.deleteMatiere(id).subscribe(() => {
        this.getMatieres(); // Rafraîchir la liste
      });
    }
  }
}
