import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, credentials);
  }

  refresh(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${apiUrl}/refresh`, {}, { headers });
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${apiUrl}/logout`, {}, { headers });
  }

  profile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${apiUrl}/profile`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
