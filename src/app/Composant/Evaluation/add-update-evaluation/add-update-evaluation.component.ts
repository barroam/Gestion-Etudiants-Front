import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvaluationsService } from '../../../Services/Evaluations/evaluations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from '../../../Services/Matieres/matieres.service';
import { ElevesService } from '../../../Services/Eleves/eleves.service';

@Component({
  selector: 'app-add-update-evaluation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-update-evaluation.component.html',
  styleUrl: './add-update-evaluation.component.css'
})
export class AddUpdateEvaluationComponent  implements OnInit {
  evaluationForm: FormGroup;
  matieres: any[] = [];
  eleves: any[] = [];
  evaluationId: any;

  constructor(
    private fb: FormBuilder,
    private evaluationsService: EvaluationsService,
    private matieresService: MatieresService,
    private elevesService: ElevesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.evaluationForm = this.fb.group({
      matiere_id: [null, Validators.required],
      eleve_id: [null, Validators.required],
      date: [null, Validators.required],
      valeurs: [null, [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }

  ngOnInit(): void {
    this.loadMatieres();
    this.loadEleves();
    this.evaluationId = this.route.snapshot.paramMap.get('id') ;

    if (this.evaluationId) {
      this.evaluationsService.getEvaluationById(this.evaluationId).subscribe(response => {
        this.evaluationForm.patchValue(response.data);
      });
    }
  }

  loadMatieres() {
    this.matieresService.getMatieres().subscribe(response => {
      this.matieres = response.data;
      console.log(response.data);

    });
  }

  loadEleves() {
    this.elevesService.getEleves().subscribe(response => {
      this.eleves = response.data;
    });
  }

  onSubmit() {
    if (this.evaluationForm.valid) {
      if (this.evaluationId) {
        this.evaluationsService.updateEvaluation(this.evaluationId, this.evaluationForm.value).subscribe(() => {
          this.router.navigate(['/Dashbord-evaluations/liste']);
        });
      } else {
        this.evaluationsService.createEvaluation(this.evaluationForm.value).subscribe(() => {
          this.router.navigate(['/Dashbord-evaluations/liste']);
        });
      }
    }
  }
}
