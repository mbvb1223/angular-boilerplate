import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { merge } from 'lodash';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpClientService {
  protected constructor(protected httpClient: HttpClient) {
  }

  abstract getEntityPath(): string;

  get(isLoading: boolean = true, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.get(this.getUrl(), options);
  }

  post(body: any | null, isLoading: boolean = true, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.post(this.getUrl(), body, options);
  }

  delete(isLoading: boolean = true, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.delete(this.getUrl(), options);
  }

  put(body: any | null, isLoading: boolean = true, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.put(this.getUrl(), body, options);
  }

  getUrl(): string {
    return environment.apiUrl + this.getEntityPath();
  }
}
