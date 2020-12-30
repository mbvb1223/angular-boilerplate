import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  tests: Array<number>;

  constructor(
  ) {
    this.tests = [1,2,3,4,5]
  }

  ngOnInit(): void {
    this.tests = [1,2,3,4,5]
  }

  ngOnDestroy(): void {
  }
}
