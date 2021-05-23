import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';
import { Path } from '@core/structs';
import { NotificationService } from '@core/services/notification.service';
import { Helper } from '@core/helpers/helper';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { SeoService } from '@core/services/seo.service';
import { PartModel } from '@core/models/part.model';

@Component({
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss'],
})
export class PartListComponent implements OnInit, OnDestroy {
  contestId: number;
  contest: ContestModel;
  parts: Array<PartModel>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    public seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.contestId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('khoa-hoc'),
    );
    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;

        this.seoService.setData(this.contest.title, this.contest.description);
        this.breadcrumbService.setItem(
          Helper.convertToContestUrl(contest.title, contest.id),
          this.contest.title,
        );
      });

    this.contestService
      .getParts(this.contestId)
      .subscribe((parts: Array<PartModel>) => {
        this.parts = parts;
      });
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

    }

    this.router.navigate([
      Path.Contest,
      Helper.convertToUrl(contest.title, contest.id),
    ]);


  }
}
