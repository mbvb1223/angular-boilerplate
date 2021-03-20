import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import merge from 'lodash/merge';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpClientService {
  protected constructor(protected httpClient: HttpClient) {}

  abstract getEntityPath(): string;

  // index(
  //   params?: HttpParams,
  //   isLoading: boolean = true,
  //   options?: {
  //     headers?:
  //       | HttpHeaders
  //       | {
  //           [header: string]: string | string[];
  //         };
  //     observe?: 'body';
  //     params?:
  //       | HttpParams
  //       | {
  //           [param: string]: string | string[];
  //         };
  //     reportProgress?: boolean;
  //     responseType?: 'json';
  //     withCredentials?: boolean;
  //   },
  // ): Observable<any> {
  //   if (!isLoading) {
  //     options = merge(options, { params: { noLoading: 'active' } });
  //   }
  //
  //   return this.httpClient.get(this.getUrl(), options);
  // }

  get(
    url: string,
    isLoading: boolean = true,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<any> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.get(url, options);
  }

  post(
    url: string,
    body: any | null,
    isLoading: boolean = true,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<any> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.post(url, body, options);
  }

  delete(
    isLoading: boolean = true,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<any> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.delete(this.getUrl(), options);
  }

  put(
    body: any | null,
    isLoading: boolean = true,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<any> {
    if (!isLoading) {
      options = merge(options, { params: { noLoading: 'active' } });
    }

    return this.httpClient.put(this.getUrl(), body, options);
  }

  getUrl(): string {
    return environment.apiUrl + this.getEntityPath();
  }
}
