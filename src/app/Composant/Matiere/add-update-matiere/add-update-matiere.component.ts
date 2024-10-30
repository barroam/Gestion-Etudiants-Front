import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatieresService } from '../../../Services/Matieres/matieres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-add-update-matiere',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-update-matiere.component.html',
  styleUrl: './add-update-matiere.component.css'
})
export class AddUpdateMatiereComponent implements OnInit {
  matiereForm: FormGroup;
  isEditMode = false;
  matiereId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private matieresService: MatieresService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.matiereForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.maxLength(255)]],
      date_debut: ['', Validators.required],
      date_fin: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matiereId = +params['id'];
      if (this.matiereId) {
        this.isEditMode = true;
        this.matieresService.getMatiereById(this.matiereId).subscribe(response => {
          this.matiereForm.patchValue(response.data);
        });
      }
    });
  }

  onSubmit() {
    if (this.matiereForm.valid) {
      if (this.isEditMode) {
        this.matieresService.updateMatiere(this.matiereId!, this.matiereForm.value).subscribe(() => {
          this.router.navigate(['/Dashbord-matieres/liste']);
        });
      } else {
        this.matieresService.createMatiere(this.matiereForm.value).subscribe(() => {
          this.router.navigate(['/Dashbord-matieres/liste']);
        });
      }
    }
  }
}
