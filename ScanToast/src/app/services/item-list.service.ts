import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) { }
  itemList: Item[] = [];

  postData(data:FormData): Observable<any> {
      return this.http.post<any>(this.apiUrl, data);
    }
  
    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }

    getItemById(itemId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}?id=${itemId}`);
    }

    updateItem(itemId: string, formData: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${itemId}`, formData);
    }


  deleteItem(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        // Handle error
        console.error('Failed to delete item', error);
        return throwError('Failed to delete item');
      })
    );
  } 

  
  }
