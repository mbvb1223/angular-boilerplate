import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@core/services/order.service';
import { ContestModel } from '@core/models/contest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-contest',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  shouldShowForm = false
  form: FormGroup;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      note: [null, Validators.required],
    });
  }

  toggleForm(): void {
    this.shouldShowForm = !this.shouldShowForm;
  }

  hideForm(): void {
    this.shouldShowForm = false;
  }

  register(): void {
    this.orderService.create(
      1,
      {note: this.form.get('note').value}
    ).subscribe((contest: any) => {
      this.shouldShowForm = false;
    });
  }
}
