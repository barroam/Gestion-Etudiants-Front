import { Component, OnInit } from '@angular/core';
import { EvaluationsService } from '../../../Services/Evaluations/evaluations.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-evaluation',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-evaluation.component.html',
  styleUrl: './list-evaluation.component.css'
})
export class ListEvaluationComponent   implements OnInit {
  evaluations: any[] = [];

  constructor(private evaluationsService: EvaluationsService ,
    private router : Router) {}

  ngOnInit(): void {
    this.loadEvaluations();
  }

  loadEvaluations() {
    this.evaluationsService.getEvaluations().subscribe((response) => {
      this.evaluations = response.data;
    //  console.log(response.data);

    });
  }


  editEvaluation(id: number): void {
    this.router.navigate([`/Dashbord-evaluations/add-update/${id}`]);
  }

  deleteEvaluation(id: number) {
    this.evaluationsService.deleteEvaluation(id).subscribe(() => {
      this.loadEvaluations();
    });
  }
}
