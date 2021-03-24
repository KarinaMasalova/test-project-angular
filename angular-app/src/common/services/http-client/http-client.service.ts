import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);  // let the app keep running by returning an empty result
    };
  }

  get<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url)
      .pipe(
        tap(_ => console.log('fetched')),
        catchError(this.handleError<T[]>('getAll', []))
      );
  }

  post<T>(url: string, entity: T): Observable<T> {
    return this.http.post<T>(url, entity, this.httpOptions)
      .pipe(
        tap((newEntity: T) => console.log(`added: ${newEntity}`)),
        catchError(this.handleError<T>('add'))
      );
  }

  deleteById<T>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted`)),
      catchError(this.handleError<T>('delete'))
    );
  }
}
