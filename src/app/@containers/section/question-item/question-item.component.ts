import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '@core/models/question.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { each } from 'lodash';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
})
export class QuestionItemComponent implements OnInit, OnDestroy {
  @Input() question: QuestionModel;
  form: FormGroup;
  selectedValue: any;

  // @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      answer_1: [null, Validators.required],
      answer_2: [null],
      answer_3: [null],
      answer_4: [null],
    });
  }

  ngOnDestroy(): void {
  }

  answer(checkbox: MatCheckboxChange) {
    this.selectedValue = checkbox.source.value;

    each([1,2,3,4], (item) => {
      if (item != this.selectedValue) {
        this.form.controls[`answer_${item}`].setValue(null);
      }
    })
  }

  isCorrectAnswer(): boolean {
    return this.selectedValue === this.question.correct_answer;
  }

  isSelectedAnswer(value) {
    return this.selectedValue == value;
  }
}
