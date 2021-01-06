import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContestService } from '@core/services/contest.service';

@Component({
  templateUrl: './contest-list.component.html',
  styleUrls: []
})
export class ContestListComponent implements OnInit, OnDestroy {
  tests: Array<number>;

  constructor(
    private contestService: ContestService
  ) {
    this.tests = [1,2,3,4,5];
    this.contestService.getA().subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    this.tests = [1,2,3,4,5]
  }

  ngOnDestroy(): void {
  }
}
