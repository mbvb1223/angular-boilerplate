import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { QuestionModel } from '@core/models/question.model';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
})
export class QuestionGroupComponent implements OnInit, OnDestroy {
  @Input() question: QuestionModel;
  @Input() questionNumber: number;
  @Input() showAnswer: boolean;
  @Input() examId: number;
  @Input() result: any;

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
