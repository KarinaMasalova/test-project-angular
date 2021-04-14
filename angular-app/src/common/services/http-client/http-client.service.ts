import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  private httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError<T[]>([])));
  }

  public post<T>(url: string, entity: object): Observable<T> {
    return this.http.post<T>(url, entity, this.httpOptions)
      .pipe(
        tap((newEntity: T) => console.log(`added: ${newEntity}`)),
        catchError(this.handleError<T>())
      );
  }

  public deleteById<T>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted`)),
      catchError(this.handleError<T>())
    );
  }

  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);  // let the app keep running by returning an empty result
    };
  }
}
