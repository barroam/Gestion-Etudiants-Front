import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElevesService } from '../../../Services/Eleves/eleves.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-eleve',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-eleve.component.html',
  styleUrl: './list-eleve.component.css'
})
export class ListEleveComponent implements OnInit {
  eleves: any[] = [];

  constructor(private elevesService: ElevesService) {}

  ngOnInit(): void {
    this.fetchEleves();
  }

  // Récupère la liste des élèves
  fetchEleves(): void {
    this.elevesService.getEleves().subscribe(
      (response) => {
        this.eleves =response.data;
        console.log(response);

      },
      (error) => {
        console.error('Erreur lors de la récupération des élèves :', error);
      }
    );
  }

  // Supprimer un élève
  deleteEleve(id: number): void {
    this.elevesService.deleteEleve(id).subscribe(
      () => {
        this.fetchEleves(); // Rafraîchit la liste après suppression
        alert('Élève supprimé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'élève :', error);
      }
    );
  }

  // Restaurer un élève
  restoreEleve(id: number): void {
    this.elevesService.restoreEleve(id).subscribe(
      () => {
        this.fetchEleves(); // Rafraîchit la liste après restauration
        alert('Élève restauré avec succès');
      },
      (error) => {
        console.error('Erreur lors de la restauration de l\'élève :', error);
      }
    );
  }
}
