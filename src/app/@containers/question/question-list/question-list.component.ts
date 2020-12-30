import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<number>;
  isValid = false;
  answerMessage: string;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.questions = [1,2,3,4]
  }

  ngOnDestroy(): void {
  }

  validAnswer(value): any {
    this.isValid = true;

    if (value === 1) {
      this.answerMessage = 'aaaaaa';
    } else {
      this.answerMessage = 'bbbbbbbbbbb';
    }


  }
}
