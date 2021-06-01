import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';
import { Path } from '@core/structs';
import { NotificationService } from '@core/services/notification.service';
import { Helper } from '@core/helpers/helper';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';

@Component({
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss'],
})
export class ContestListComponent implements OnInit, OnDestroy {
  contests: Array<ContestModel>;
  currentUser: UserModel | null;

  constructor(
    private router: Router,
    private contestService: ContestService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    private authBackendService: AuthBackendService,
  ) {}

  ngOnInit(): void {
    this.contestService.index().subscribe((contests: Array<ContestModel>) => {
      this.contests = contests;
    });

    this.breadcrumbService.setItem();
  }

  ngOnDestroy(): void {}

  goToContest(contest: ContestModel) {
    if (!contest.isActive) {
      this.notificationService.warning('Khóa học đang tạm khóa!');
      return;
    }

    if (contest.isSection) {
      this.router.navigate([
        Helper.convertToUrl(contest.title, contest.id),
        'mon-thi',
        `${contest.title}-${contest.subjects[0].id}`,
      ]);
      return;
    }

    if (contest.isPart) {
      if (this.authBackendService.getCurrentUser()) {
        this.router.navigate([
          'khoa-hoc',
          Helper.convertToUrl(contest.title, contest.id),
          'p-0',
        ]);
        return;
      }

      this.notificationService.warning('Vui lòng đăng nhập!');
      this.router.navigate([Path.SignIn], {
        queryParams: {
          returnUrl:
            'khoa-hoc/' +
            Helper.convertToUrl(contest.title, contest.id) +
            '/p-0',
        },
      });
      return;
    }

    this.router.navigate([
      Path.Contest,
      Helper.convertToUrl(contest.title, contest.id),
    ]);
  }
}
