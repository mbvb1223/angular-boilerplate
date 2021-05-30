import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';
import { NotificationService } from '@core/services/notification.service';
import { Helper } from '@core/helpers/helper';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { SeoService } from '@core/services/seo.service';
import { PartModel } from '@core/models/part.model';
import { NoteModel } from '@core/models/note.model';
import { CommentModel } from '@core/models/comment.model';

@Component({
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss'],
})
export class PartListComponent implements OnInit, OnDestroy {
  contestId: number;
  contest: ContestModel;
  parentParts: Array<PartModel>;
  allParts: Array<PartModel>;
  currentPart: PartModel;
  notes: Array<NoteModel>;
  comments: Array<CommentModel>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
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
        this.parentParts = parts;
        this.currentPart = parts[0];
      });
  }

  ngOnDestroy(): void {}

  selectPart(id: number): void {
    this.currentPart = <PartModel>(
      this.getAllParts().find((part: PartModel) => part.id === id)
    );
  }

  getAllParts(): Array<PartModel> {
    const data: PartModel[] = [];
    this.parentParts.forEach((parentPart: PartModel) => {
      data.push(parentPart);
      parentPart.children.forEach((part: PartModel) => data.push(part))
    });

    return data;
  }
}
