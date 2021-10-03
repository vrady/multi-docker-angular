import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FibService {
  constructor(
    private _httpClient: HttpClient,
  ) {}

  public fetchValues(): Observable<{}> {
    return this._httpClient
      .get<{}>('/api/values/all')
      .pipe(
        map(({ data }: any) => data),
      );
  }

  public fetchIndexes(): Observable<number[]> {
    return this._httpClient
      .get<number[]>('/api/values/current')
      .pipe(
        map(({ data }: any) => data),
      );
  }

  public postIndex(index: number): Observable<void> {
    return this._httpClient.post<void>('/api/values', { index });
  }
}
