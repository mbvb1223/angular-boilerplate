import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuestionModel } from '@core/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '@core/services/section.service';
import { ICollection } from '@core/interfaces/collection.interface';
import { Helper } from '@core/helpers/helper';
import { PageEvent } from '@angular/material/paginator/paginator';
import { StoreKeyEnum } from '@core/structs/store-key.enum';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: [],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<QuestionModel>;
  sectionId: number;
  contestId: number;
  isActiveOrder: boolean;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private sessionStorageService: SessionStorageService,
  ) {
    this.sectionId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('id'),
    );

    this.contestId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('ky-thi'),
    );
  }

  ngOnInit(): void {
    this.sectionService
      .paginateQuestions(this.sectionId, this.currentPage + 1, this.pageSize)
      .subscribe((questionCollection: ICollection) => {
        this.questions = questionCollection.data;
        this.totalSize = questionCollection.meta.total;
      });

    this.isActiveOrder = Helper.isActiveOrder(
      this.sessionStorageService.retrieve(StoreKeyEnum.Order),
      Helper.getId(<string>this.route.snapshot.paramMap.get('ky-thi')),
    );
  }

  ngOnDestroy(): void {}

  handlePage(event: PageEvent) {
    Helper.scrollTop();

    this.sectionService
      .paginateQuestions(this.sectionId, event.pageIndex + 1, this.pageSize)
      .subscribe((questionCollection: ICollection) => {
        this.questions = questionCollection.data;
        this.currentPage = event.pageIndex;
        this.totalSize = questionCollection.meta.total;
      });
  }
}
