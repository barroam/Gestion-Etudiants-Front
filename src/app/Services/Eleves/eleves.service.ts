
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, ) {
    this.headers = this.getAuthHeaders(); // Utilise les headers d'authentification
  }


  // Récupérer tous les élèves
  getEleves(): Observable<any> {
    return this.http.get(`${apiUrl}/eleves`, { headers: this.headers });
  }

  // Récupérer un élève par son ID
  getEleveById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/eleves/${id}`, { headers: this.headers });
  }

  // Créer un nouvel élève
  createEleve(eleveData: any): Observable<any> {
    return this.http.post(`${apiUrl}/eleves`, eleveData, { headers: this.headers });
  }

  // Mettre à jour un élève
  updateEleve(id: number, eleveData: any): Observable<any> {
    return this.http.patch(`${apiUrl}/eleves/${id}`, eleveData, { headers: this.headers });
  }

  // Supprimer un élève
  deleteEleve(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/eleves/${id}`, { headers: this.headers });
  }

  // Restaure un élève
  restoreEleve(id: number): Observable<any> {
    return this.http.post(`${apiUrl}/eleves-restore/${id}`, {}, { headers: this.headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
