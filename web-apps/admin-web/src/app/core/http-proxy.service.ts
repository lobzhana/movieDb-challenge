import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService {
  formatUrl = (url) => `${environment.apiUri}${url}`;

  constructor(private httpClient: HttpClient) {}

  get<T>(
    url: string,
    options: {
      params?: {
        [param: string]: string | string[];
      };
    } = null
  ): Observable<T> {
    return this.httpClient.get<T>(this.formatUrl(url), {
      params: { ...options?.params },
    });
  }

  post<TModel>(url: string, model: TModel): Observable<any> {
    return this.httpClient.post(this.formatUrl(url), model);
  }

  postFormData<TModel>(url: string, formData: FormData): Observable<any> {
    return this.httpClient.post(this.formatUrl(url), formData);
  }

  put<TModel>(url: string, model: TModel): Observable<any> {
    return this.httpClient.put(this.formatUrl(url), model);
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete(this.formatUrl(url));
  }
}
