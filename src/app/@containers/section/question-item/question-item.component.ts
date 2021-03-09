import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '@core/models/question.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
})
export class QuestionItemComponent implements OnInit, OnDestroy {
  @Input() question: QuestionModel;
  @Input() questionNumber: number;
  form: FormGroup;
  selectedValue: number;

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      answer_1: [null, Validators.required],
      answer_2: [null],
      answer_3: [null],
      answer_4: [null],
    });
  }

  ngOnDestroy(): void {}

  answer(checkbox: MatCheckboxChange) {
    this.selectedValue = parseInt(checkbox.source.value);

    [1, 2, 3, 4].forEach((item: number) => {
      if (item != this.selectedValue) {
        this.form.controls[`answer_${item}`].setValue(null);
      }
    });
  }

  isCorrectAnswer(): boolean {
    return this.selectedValue === this.question.correct_answer;
  }

  // isSelectedAnswer(value) {
  //   return this.selectedValue == value;
  // }
}
