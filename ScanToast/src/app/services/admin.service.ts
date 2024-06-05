import { Injectable } from '@angular/core';
import { Bill } from '../interfaces/bill';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private email = 'shubhamdogra2000@gmail.com';
  private password = 'Shubh@13m';

  private apiUrl = 'http://localhost:3001/api/bills';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): boolean {
    return username === this.email && password === this.password;
  }

  storeBill(info:Bill):Observable<any>{
    console.log("info passed: ",info);
    return this.http.post<any>(this.apiUrl,info);
  }

  getBills():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
