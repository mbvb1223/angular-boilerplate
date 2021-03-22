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

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
})
export class ExamItemComponent implements OnInit, OnDestroy {
  @Input() question: any;
  @Input() correctAnswerId: any;
  @Input() localStorageKey: any;
  @Input() selectedValue: any;
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  answer(value: number) {
    this.selectedValue = value;
    this.newItemEvent.emit(value);
  }

  isCorrectAnswer(): boolean {
    return this.selectedValue === this.correctAnswerId;
  }

  isSelectedAnswer(value: any) {
    console.log('isSelectedAnswer');
    return this.selectedValue == value;
  }

  isAnswered() {
    return this.selectedValue;
  }
}
