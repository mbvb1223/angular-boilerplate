import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';

@Component({
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit, OnDestroy {
  contests: Array<ContestModel>;

  constructor(
    private contestService: ContestService
  ) {

  }

  ngOnInit(): void {
    this.contestService.index().subscribe((contests: Array<ContestModel>) => {
      this.contests = contests
    });
  }

  ngOnDestroy(): void {
  }
}
