import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestModel } from '@core/models/contest.model';
import { OrderModel } from '@core/models/order.model';

@Component({
  selector: 'app-order-contest',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  @Input() contest: ContestModel;
  shouldShowForm = false
  form: FormGroup;
  isRegistered: boolean
  private _isActive = false
  private _isInactive = false

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      note: [null, Validators.required],
    });

    this.orderService.index().subscribe((order: Array<OrderModel>) => {
      order.forEach((item, index) => {
        if (item.contest_id === this.contest.id && item.status === OrderModel.STATUS_INACTIVE) {
          this.isInactive = true;
        }
        if (item.contest_id === this.contest.id && item.status === OrderModel.STATUS_ACTIVE) {
          this.isActive = true;
        }
      })

      this.isRegistered = !!(this.isActive || this.isInactive);
    });
  }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.shouldShowForm = !this.shouldShowForm;
  }

  hideForm(): void {
    this.shouldShowForm = false;
  }

  register(): void {
    this.orderService.create(
      this.contest.id,
      { note: this.form.get('note').value }
    ).subscribe((contest: any) => {
      this.shouldShowForm = false;
      this.isInactive = true;
    });
  }

  set isInactive(value) {
    this._isInactive = value;
    this.isRegistered = (this.isActive || this.isInactive);
  }

  get isInactive(): boolean {
    return this._isInactive;
  }

  set isActive(value) {
    this._isActive = value;
    this.isRegistered = (this.isActive || this.isInactive);
  }

  get isActive(): boolean {
    return this._isActive;
  }
}
