import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '@core/models/question.model';
import { ExamService } from '@core/services/exam.service';
import { Helper } from '@core/helpers/helper';
import { ExamModel } from '@core/models/exam.model';
import { PageEvent } from '@angular/material/paginator/paginator';

@Component({
  selector: 'app-exam-item',
  templateUrl: './exam-item.component.html',
})
export class ExamItemComponent implements OnInit, OnDestroy {
  examId: number;
  exam: ExamModel;
  questions: Array<QuestionModel>;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
    private examService: ExamService,
  ) {}

  ngOnInit(): void {
    this.examId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('de-thi'),
    );

    this.examService.getById(this.examId).subscribe((exam: ExamModel) => {
      this.exam = exam;
      this.questions = this.paginate(exam.questions, this.pageSize, 1);
      this.totalSize = exam.questions.length;
    });
  }

  ngOnDestroy(): void {}

  handlePage(event: PageEvent) {
    Helper.scrollTop();

    this.paginate(this.exam.questions, event.pageIndex + 1, 1);
    this.currentPage = event.pageIndex;
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
