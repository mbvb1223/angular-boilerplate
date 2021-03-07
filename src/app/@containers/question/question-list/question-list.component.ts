import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chunk } from 'lodash';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Array<number>;
  questionGroups: Array<Array<number>>;
  part: number;
  answeredList: any;
  correctAnsweredList: any = [];

  localStorageKey = 'answered_';

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
  ) {
    this.localStorageKey += this.route.snapshot.paramMap.get('id');
    this.answeredList = this.localSt.retrieve(this.localStorageKey) || [];

    console.log(this.answeredList);
  }

  ngOnInit(): void {
    this.questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // this.questions = [1];
    this.questionGroups = chunk(this.questions, 5);
    this.correctAnsweredList[1] = 2;
    this.correctAnsweredList[2] = 3;
    this.correctAnsweredList[3] = 4;
    this.correctAnsweredList[4] = 1;

    this.route.queryParams.subscribe((params) => {
      this.part = parseInt(params['part']) || 1;
    });
  }

  ngOnDestroy(): void {}

  saveAnswer(value) {
    this.answeredList[1] = value;
    this.localSt.store(this.localStorageKey, this.answeredList);
  }

  getSelectedByQuestionId(questionId) {
    return this.answeredList[questionId];
  }
}
