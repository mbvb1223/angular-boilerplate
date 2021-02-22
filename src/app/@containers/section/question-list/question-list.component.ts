import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuestionModel } from '@core/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '@core/services/section.service';
import { ICollection } from '@core/interfaces/collection.interface';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: []
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<QuestionModel>;
  sectionId: number;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {
    this.sectionId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.sectionService
      .paginateQuestions(this.sectionId, (this.currentPage + 1), this.pageSize)
      .subscribe((questionCollection: ICollection) => {
        this.questions = questionCollection.data;
        this.totalSize = questionCollection.meta.total;
      });
  }

  ngOnDestroy(): void {
  }

  public handlePage(event: any) {
    window.scrollTo({top: 0, behavior: 'smooth'});

    this.sectionService
      .paginateQuestions(this.sectionId, (event.pageIndex + 1), this.pageSize)
      .subscribe((questionCollection: ICollection) => {
        this.questions = questionCollection.data;
        this.currentPage = event.pageIndex;
        this.totalSize = questionCollection.meta.total;
      });
  }
}
