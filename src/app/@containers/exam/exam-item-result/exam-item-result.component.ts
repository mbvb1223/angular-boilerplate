import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator/paginator';

import { SessionStorageService } from 'ngx-webstorage';
import { QuestionModel } from '@core/models/question.model';
import { ExamService } from '@core/services/exam.service';
import { Helper } from '@core/helpers/helper';
import { ExamModel } from '@core/models/exam.model';
import { UserExamModel } from '@core/models/user-exam.model';

@Component({
  selector: 'app-exam-item-result',
  templateUrl: './exam-item-result.component.html',
})
export class ExamItemResultComponent implements OnInit, OnDestroy {
  examId: number;
  resultId: number;
  exam: ExamModel;
  questions: Array<QuestionModel>;
  answers: Array<number>;
  result: any;
  analytics: Array<number>;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public lastPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private examService: ExamService,
  ) {}

  ngOnInit(): void {
    this.examId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('de-thi'),
    );
    this.resultId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('result-id'),
    );

    this.examService
      .getResult(this.examId, this.resultId)
      .pipe(
        switchMap((userExam: UserExamModel) => {
          this.result = JSON.parse(userExam.answer);
          return this.examService.getById(this.examId);
        }),
      )
      .subscribe((exam: ExamModel) => {
        this.exam = exam;
        this.questions = this.paginate(exam.questions, this.pageSize, 1);
        this.totalSize = exam.questions.length;
        this.lastPage = Math.ceil(this.totalSize / this.pageSize) - 1;
      });
  }

  ngOnDestroy(): void {}

  handlePage(event: PageEvent) {
    Helper.scrollTop();

    this.questions = this.paginate(
      this.exam.questions,
      event.pageSize,
      event.pageIndex + 1,
    );
    this.currentPage = event.pageIndex;
  }

  isLastPage(): boolean {
    return this.currentPage === this.lastPage;
  }

  public getAnalyticsNumber(): Array<number> {
    if (this.analytics) {
      return this.analytics;
    }

    let number = 0;
    let correctNumber = 0;
    this.exam.questions.forEach((question: QuestionModel) => {
      if (question.isParent) {
        number += question.children.length;

        question.children.forEach((questionItem: QuestionModel) => {
          if (
            questionItem.id in this.result &&
            question.correct_answer == this.result[questionItem.id]
          ) {
            correctNumber++;
          }
        });
      } else {
        number += 1;
        if (
          question.id in this.result &&
          question.correct_answer == this.result[question.id]
        ) {
          correctNumber++;
        }
      }
    });

    return (this.analytics = [
      number,
      correctNumber,
    ]);
  }

  paginate(
    array: Array<QuestionModel>,
    pageSize: number,
    pageNumber: number,
  ): Array<QuestionModel> {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }
}
