import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {LoadingScreenService} from '@app/shared/loading-screen/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private loadingScreenService: LoadingScreenService
  ) {
  }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingScreenService.loadingStatusSubject.pipe(
      debounceTime(100)
    ).subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
