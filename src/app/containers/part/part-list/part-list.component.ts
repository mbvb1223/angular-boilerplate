import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';
import { NotificationService } from '@core/services/notification.service';
import { Helper } from '@core/helpers/helper';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { SeoService } from '@core/services/seo.service';
import { PartModel } from '@core/models/part.model';
import { NoteModel } from '@core/models/note.model';
import { CommentModel } from '@core/models/comment.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PartListComponent implements OnInit, OnDestroy {
  contestId: number;
  currentPartId: number;
  contestContent: SafeHtml;
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
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.contestId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('khoa-hoc'),
    );
    this.currentPartId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('part'),
    );

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentPartId = Helper.getId(
          <string>this.route.snapshot.paramMap.get('part'),
        );
        this.currentPart = this.getPartById(this.currentPartId);
      }
    });

    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;
        this.contestContent = this.sanitizer.bypassSecurityTrustHtml(
          this.contest.description,
        );

        this.seoService.setData(this.contest.title, this.contest.description);
        this.breadcrumbService.setItem(
          Helper.parentUrl(this.router.url) + '/p-0',
          this.contest.title,
        );
      });

    this.contestService
      .getParts(this.contestId)
      .subscribe((parts: Array<PartModel>) => {
        this.parentParts = parts;

        this.currentPart = this.getPartById(this.currentPartId);
      });
  }

  ngOnDestroy(): void {}

  selectPart(id: number): void {
    this.currentPart = this.getPartById(id);

    this.router.navigate([
      'khoa-hoc/' + Helper.convertToUrl(this.contest.title, this.contest.id),
      Helper.convertToUrl(this.currentPart.title, this.currentPart.id),
    ]);
  }

  getAllParts(): Array<PartModel> {
    const data: PartModel[] = [];
    this.parentParts.forEach((parentPart: PartModel) => {
      data.push(parentPart);
      parentPart.children.forEach((part: PartModel) => data.push(part));
    });

    return data;
  }

  private getPartById(id: number): PartModel {
    return <PartModel>(
      this.getAllParts().find((part: PartModel) => part.id === id)
    );
  }
}
