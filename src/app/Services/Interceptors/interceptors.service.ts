import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {
  constructor() { }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token à partir de StorageService
  const token = localStorage.getItem('access_token');

  // Si pas de token, passer à la requête suivante sans modification
  if (!token) {
    return next(req);
  }

  // Cloner la requête en y ajoutant l'en-tête Authorization avec le Bearer token
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
};
