import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
})
export class QuestionItemComponent implements OnInit, OnDestroy {
  @Input() test: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
