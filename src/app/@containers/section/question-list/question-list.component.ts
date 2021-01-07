import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuestionModel } from '@core/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '@core/services/section.service';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: []
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<QuestionModel>;
  sectionId: number;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {
    this.sectionId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.sectionService.getQuestions(this.sectionId).subscribe((questions: Array<QuestionModel>) => {
      this.questions = questions;
    });
  }

  ngOnDestroy(): void {
  }
}
