import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  signUp(body: any) {
    return this.http.post('/api/auth/signup', body);
  }

  login(body: any) {
    return this.http.post('/api/auth', body);
  }

  getProfile() {
    return this.http.get('/api/auth/profile');
  }

  logout() {
    return this.http.post('/api/auth/logout', {});
  }

  getMomentList() {
    return this.http.get('/api/moments');
  }

  deleteMoment(id: string) {
    return this.http.delete('/api/moments/' + id);
  }

  getMoment(id: string) {
    return this.http.get('/api/moments/' + id);
  }

  createMoment(formData: FormData) {
    return this.http.post('/api/moments', formData);
  }

  updateMoment(id: string, formData: FormData) {
    return this.http.put('/api/moments/' + id, formData);
  }
}
