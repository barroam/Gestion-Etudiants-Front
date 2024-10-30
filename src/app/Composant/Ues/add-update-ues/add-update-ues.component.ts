import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UesService } from '../../../Services/Ues/ues.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-update-ues',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './add-update-ues.component.html',
  styleUrl: './add-update-ues.component.css'
})
export class AddUpdateUesComponent implements OnInit {
  ueForm: FormGroup;
  ueId: number | null = null;

  constructor(
    private uesService: UesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.ueForm = this.fb.group({
      matiere_id: 1,  // Valeur par défaut
      libelle: [''],
      coef: [0],
      date_debut: [''],
      date_fin: ['']
    });
  }

  ngOnInit(): void {
    // Récupère l'ID de l'UE si on est en mode modification
    this.ueId = +this.route.snapshot.paramMap.get('id')!;
    if (this.ueId) {
      this.uesService.getUeById(this.ueId).subscribe((response) => {
        this.ueForm.patchValue(response.data);
      });
    }
  }

  onSubmit(): void {
    if (this.ueId) {
      // Mode mise à jour
      this.uesService.updateUe(this.ueId, this.ueForm.value).subscribe(() => {
        this.router.navigate(['/Dashbord-ues/liste']);
      });
    } else {
      // Mode création
      this.uesService.createUe(this.ueForm.value).subscribe(() => {
        this.router.navigate(['/Dashbord-ues/liste']);
      });
    }
  }
}
