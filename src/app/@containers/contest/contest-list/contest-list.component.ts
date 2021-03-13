import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';
import { Path } from '@core/structs';
import { NotificationService } from '@core/services/notification.service';
import { Helper } from '@core/helpers/helper';

@Component({
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss'],
})
export class ContestListComponent implements OnInit, OnDestroy {
  contests: Array<ContestModel>;

  constructor(
    private router: Router,
    private contestService: ContestService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.contestService.index().subscribe((contests: Array<ContestModel>) => {
      this.contests = contests;
    });
  }

  ngOnDestroy(): void {}

  goToContest(contest: ContestModel) {
    if (contest.isActive) {
      this.router.navigate([
        Path.Contest,
        Helper.convertToUrl(contest.title, contest.id),
      ]);
      return;
    }

    this.notificationService.warning('Khóa học đang tạm khóa!');
  }
}
