import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chunk } from 'lodash'

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<number>;
  questionGroups: Array<Array<number>>;
  isValid = false;
  answerMessage: string;
  fragment: number;
  part: number;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.questions = [1,2,3,4,5,6,7,8,9,10];
    this.questionGroups = chunk(this.questions, 5);
    console.log(this.questionGroups);

    this.route.fragment.subscribe((fragment: string) => {
      this.fragment = parseInt(fragment) || 1;
    })
    this.route.queryParams.subscribe(params => {
      this.part = parseInt(params['part']) || 1;
    });
  }

  ngOnDestroy(): void {
  }

  validAnswer(value): any {
    this.isValid = true;

    if (value === 1) {
      this.answerMessage = 'DUNG';
    } else {
      this.answerMessage = 'SAI';
    }
  }
}
