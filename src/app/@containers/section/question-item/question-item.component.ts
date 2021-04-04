import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
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
  @Input() questionPrefix: string;
  @Input() showAnswer: boolean;
  @Input() examId: number;
  @Input() result: any;
  selectedValue: number | null;
  sessionKey: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      answer_1: [null, Validators.required],
      answer_2: [null],
      answer_3: [null],
      answer_4: [null],
    });

    this.sessionKey = 'exam_' + this.examId + '_answers';
    const answers = this.getAnswers();
    this.selectedValue =
      this.question.id in answers ? answers[this.question.id] : null;

    if (this.selectedValue) {
      this.form.controls[`answer_${this.selectedValue}`].setValue(true);
    }
  }

  ngOnDestroy(): void {}

  answer(checkbox: MatCheckboxChange) {
    this.selectedValue = checkbox.checked
      ? parseInt(checkbox.source.value)
      : null;

    [1, 2, 3, 4].forEach((item: number) => {
      if (item != this.selectedValue) {
        this.form.controls[`answer_${item}`].setValue(null);
      }
    });

    if (this.examId) {
      const answers = this.getAnswers();
      answers[`${this.question.id}`] = this.selectedValue;
      this.sessionStorageService.store(this.sessionKey, answers);
    }
  }

  isCorrectAnswer(): boolean {
    return this.selectedValue === this.question.correct_answer;
  }

  shouldShowAnswer(): boolean {
    return (
      !!this.selectedValue && !!this.question.description && this.showAnswer
    );
  }

  private getAnswers(): any {
    if (this.result) {
      return this.result;
    }

    return this.sessionStorageService.retrieve(this.sessionKey) || {};
  }
}
