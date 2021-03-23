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
import { ICollection } from '@core/interfaces/collection.interface';
import { ExamService } from '@core/services/exam.service';
import { Helper } from '@core/helpers/helper';
import { ExamModel } from '@core/models/exam.model';

@Component({
  selector: 'app-exam-item',
  templateUrl: './exam-item.component.html',
})
export class ExamItemComponent implements OnInit, OnDestroy {
  questions: Array<QuestionModel>;
  examId: number;
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
      this.questions = exam.questions;
      console.log(this.questions);
    });
  }

  ngOnDestroy(): void {}

  handlePage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.examService.getById(this.examId).subscribe((exam: ExamModel) => {
      this.questions = exam.questions;
    });
  }
}
