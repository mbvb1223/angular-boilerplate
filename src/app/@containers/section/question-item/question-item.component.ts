import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '@core/models/question.model';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
})
export class QuestionItemComponent implements OnInit, OnDestroy {
  @Input() question: QuestionModel;
  @Input() selectedValue: any;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  answer(value: number) {
    this.selectedValue = value;
    // this.newItemEvent.emit(value);
  }

  isCorrectAnswer(): boolean {
    return this.selectedValue === this.question.correct_answer;
  }

  isSelectedAnswer(value) {
    console.log('isSelectedAnswer');
    return this.selectedValue == value;
  }
}
