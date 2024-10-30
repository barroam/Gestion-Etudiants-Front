import { Component, OnInit } from '@angular/core';
import { ElevesService } from '../../../Services/Eleves/eleves.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-eleve',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-update-eleve.component.html',
  styleUrl: './add-update-eleve.component.css'
})
export class AddUpdateEleveComponent  implements OnInit {
  eleveForm: FormGroup;
  isUpdateMode = false;

  constructor(
    private fb: FormBuilder,
    private elevesService: ElevesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire avec des validations
    this.eleveForm = this.fb.group({
      matricule: ['', [Validators.required, Validators.maxLength(50)]],
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      prenom: ['', [Validators.required, Validators.maxLength(255)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      date_naissance: ['', [Validators.required]],
      photo: ['', [Validators.required, Validators.pattern('https?://.+')]] // Validation pour l'URL
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdateMode = true;
      this.elevesService.getEleveById(id).subscribe((response) => {
        this.eleveForm.patchValue(response.data); // Pré-remplir le formulaire en mode modification
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.eleveForm.controls[field];
    if (control.hasError('required')) {
      return `${field} est requis.`;
    } else if (control.hasError('maxlength')) {
      return `${field} dépasse la longueur maximale.`;
    } else if (control.hasError('email')) {
      return `Veuillez entrer un email valide.`;
    } else if (control.hasError('pattern')) {
      return `Veuillez entrer une URL valide pour la photo.`;
    }
    return '';
  }

  saveEleve(): void {
    if (this.eleveForm.invalid) {
      return; // Arrête si le formulaire est invalide
    }

    const formData = this.eleveForm.value;

    if (this.isUpdateMode) {
      const id = this.route.snapshot.params['id'];
      this.elevesService.updateEleve(Number(id), formData).subscribe({
        next: () => {
          alert('Élève mis à jour avec succès');
          this.router.navigate(['/Dashbord-eleves']);
        },
        error: (err) => console.error('Erreur lors de la mise à jour de l\'élève:', err)
      });
    } else {
      this.elevesService.createEleve(formData).subscribe({
        next: () => {
          alert('Élève ajouté avec succès');
          this.router.navigate(['/Dashbord-eleves']);
        },
        error: (err) => console.error('Erreur lors de l\'ajout de l\'élève:', err)
      });
    }
  }
}
