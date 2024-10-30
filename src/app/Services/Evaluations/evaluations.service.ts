import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getAuthHeaders(); // Utilise les headers d'authentification
  }

  // Récupérer toutes les évaluations
  getEvaluations(): Observable<any> {
    return this.http.get(`${apiUrl}/evaluations`, { headers: this.headers });
  }

  // Récupérer une évaluation par son ID
  getEvaluationById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/evaluations/${id}`, { headers: this.headers });
  }

  // Créer une nouvelle évaluation
  createEvaluation(evaluationData: any): Observable<any> {
    return this.http.post(`${apiUrl}/evaluations`, evaluationData, { headers: this.headers });
  }

  // Mettre à jour une évaluation
  updateEvaluation(id: number, evaluationData: any): Observable<any> {
    return this.http.patch(`${apiUrl}/evaluations/${id}`, evaluationData, { headers: this.headers });
  }

  // Supprimer une évaluation
  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/evaluations/${id}`, { headers: this.headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
