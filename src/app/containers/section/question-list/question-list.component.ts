import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

import { QuestionModel } from '@core/models/question.model';
import { SectionService } from '@core/services/section.service';
import { ICollection } from '@core/interfaces/collection.interface';
import { Helper } from '@core/helpers/helper';
import { StoreKeyEnum } from '@core/structs/store-key.enum';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: [],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<QuestionModel>;
  sectionId: number;
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
