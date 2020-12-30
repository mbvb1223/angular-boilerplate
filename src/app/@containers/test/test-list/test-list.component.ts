import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './test-list.component.html',
  styleUrls: []
})
export class TestListComponent implements OnInit, OnDestroy {
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
