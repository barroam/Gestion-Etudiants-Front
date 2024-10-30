import { response } from 'express';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ElevesService } from '../../../Services/Eleves/eleves.service';
import { EvaluationsService } from '../../../Services/Evaluations/evaluations.service';
import { MatieresService } from '../../../Services/Matieres/matieres.service';
Chart.register(...registerables);
@Component({
  selector: 'app-contenu',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './contenu.component.html',
  styleUrl: './contenu.component.css'
})
export class ContenuComponent  implements OnInit {
  private combinedChart!: Chart<'bar' | 'line' | 'doughnut'>;
  eleves: any[] = [];
  matieres: any[] = [];
  evaluations: any[] = [];

  constructor(
    private eleveService: ElevesService,
    private evaluationService: EvaluationsService,
    private matiereService: MatieresService
  ) {}

  ngOnInit(): void {
    this.initChart();
    this.fetchData();
  }

  private initChart(): void {
    this.combinedChart = new Chart('combinedChart', {
      type: 'bar', // Type principal
      data: {
        labels: [], // Les labels seront mis à jour
        datasets: [
          {
            label: 'Notes des élèves',
            type: 'bar',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Matières',
            type: 'doughnut',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
          {
            label: 'Évaluations',
            type: 'line',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      } as Partial<ChartConfiguration<'bar' | 'line' | 'doughnut'>>['options'],
    });
  }

  private fetchData(): void {
    this.eleveService.getEleves().subscribe((response) => {
      this.eleves = response.data;
      this.updateChartDataset(0, this.extractNotes(this.eleves));
    });
    this.matiereService.getMatieres().subscribe((response) => {
      this.matieres = response.data;
      this.updateChartDataset(1, this.extractMatièresData(this.matieres));
    });
    this.evaluationService.getEvaluations().subscribe((response) => {
      this.evaluations = response.data;
      this.updateChartDataset(2, this.extractEvaluationsData(this.evaluations));
    });
  }

  private extractNotes(eleves: any[]): number[] {
    return eleves.map(eleve => eleve.id);
  }

  private extractMatièresData(matieres: any[]): number[] {
    return matieres.map(matiere => matiere.id); // Remplacez par la logique appropriée
  }

  private extractEvaluationsData(evaluations: any[]): number[] {
    return evaluations.map(evaluation => evaluation.valeurs);
  }

  private updateChartDataset(datasetIndex: number, data: number[]): void {
    const chartData = this.combinedChart.data.datasets[datasetIndex];
    if (chartData) {
      chartData.data = data;
      this.combinedChart.update();
    }
  }
}
