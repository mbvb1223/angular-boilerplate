import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestModel } from '@core/models/contest.model';
import { OrderModel } from '@core/models/order.model';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';

@Component({
  selector: 'app-order-contest',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  @Input() contest: ContestModel;
  shouldShowForm = false;
  form: FormGroup;
  shouldShowRegisterElement: boolean;
  user: UserModel | null;
  private _isActive = false;
  private _isInactive = false;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    public authService: AuthBackendService,
  ) {
    this.form = this.formBuilder.group({
      note: [null, Validators.required],
    });

    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.user) {
      this.orderService.index().subscribe((order: Array<OrderModel>) => {
        order.forEach((item, index) => {
          if (
            item.contest_id === this.contest.id &&
            item.status === OrderModel.STATUS_INACTIVE
          ) {
            this.isInactive = true;
          }
          if (
            item.contest_id === this.contest.id &&
            item.status === OrderModel.STATUS_ACTIVE
          ) {
            this.isActive = true;
          }
        });
      });
    }
  }

  toggleForm(): void {
    this.shouldShowForm = !this.shouldShowForm;
  }

  hideForm(): void {
    this.shouldShowForm = false;
  }

  register(): void {
    this.orderService
      .create(this.contest.id, { note: this.form.get('note')?.value })
      .subscribe((contest: any) => {
        this.shouldShowForm = false;
        this.isInactive = true;
      });
  }

  set isInactive(value: boolean) {
    this._isInactive = value;
    this.shouldShowRegisterElement = this.isActive || this.isInactive;
  }

  get isInactive(): boolean {
    return this._isInactive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
    this.shouldShowRegisterElement = this.isActive || this.isInactive;
  }

  get isActive(): boolean {
    return this._isActive || (this.shouldShowRegisterElement && this.contest.isFree);
  }
}
