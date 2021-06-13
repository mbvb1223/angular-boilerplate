import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loadingStatus$: Subject<boolean> = new Subject();

  startLoading(): void {
    this.loadingStatus$.next(true);
  }

  stopLoading(): void {
    this.loadingStatus$.next(false);
  }

  get loadingStatusSubject(): Subject<boolean> {
    return this.loadingStatus$;
  }
}
