import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class UesService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getAuthHeaders(); // Headers d'authentification
  }

  // Récupérer toutes les UE
  getUes(): Observable<any> {
    return this.http.get(`${apiUrl}/ues`, { headers: this.headers });
  }

  // Récupérer une UE par son ID
  getUeById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/ues/${id}`, { headers: this.headers });
  }

  // Créer une nouvelle UE
  createUe(ueData: any): Observable<any> {
    return this.http.post(`${apiUrl}/ues`, ueData, { headers: this.headers });
  }

  // Mettre à jour une UE
  updateUe(id: number, ueData: any): Observable<any> {
    return this.http.patch(`${apiUrl}/ues/${id}`, ueData, { headers: this.headers });
  }

  // Supprimer une UE
  deleteUe(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/ues/${id}`, { headers: this.headers });
  }

  // Génère les headers d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupération du token depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
