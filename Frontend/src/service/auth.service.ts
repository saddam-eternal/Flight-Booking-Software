// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/passengers/create'
  constructor(private http: HttpClient) { }

  // Function to make a POst request to the API
  getData(data:any) {
    this.http.post<any>(this.apiUrl, data).subscribe(data => {
     return data.id;
  })
  }
}
