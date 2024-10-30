import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getAuthHeaders(); // Utilise les headers d'authentification
  }

  // Récupérer toutes les matières
  getMatieres(): Observable<any> {
    return this.http.get(`${apiUrl}/matieres`, { headers: this.headers });
  }

  // Récupérer une matière par son ID
  getMatiereById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/matieres/${id}`, { headers: this.headers });
  }

  // Créer une nouvelle matière
  createMatiere(matiereData: any): Observable<any> {
    return this.http.post(`${apiUrl}/matieres`, matiereData, { headers: this.headers });
  }

  // Mettre à jour une matière
  updateMatiere(id: number, matiereData: any): Observable<any> {
    return this.http.patch(`${apiUrl}/matieres/${id}`, matiereData, { headers: this.headers });
  }

  // Supprimer une matière (en fait, on marquera comme supprimée)
  deleteMatiere(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/matieres/${id}`, { headers: this.headers });
  }



  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
