import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  post<TModel>(url: string, model: TModel): Observable<any> {
    return this.httpClient.post(url, model);
  }

  put<TModel>(url: string, model: TModel): Observable<any> {
    return this.httpClient.put(url, model);
  }
}
