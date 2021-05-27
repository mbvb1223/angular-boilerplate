import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '@core/services/order.service';
import { ContestModel } from '@core/models/contest.model';
import { OrderModel } from '@core/models/order.model';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';
import { StoreKeyEnum } from '@core/structs/store-key.enum';
import { ContestService } from '@core/services/contest.service';
import { Helper } from '@core/helpers/helper';
import { Path } from '@core/structs';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-order-contest',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  @Input() contestId: number;
  @Input() contest: ContestModel;
  shouldShowForm = false;
  form: FormGroup;
  shouldShowRegisterElement: boolean;
  user: UserModel | null;
  isActive = false;
  isInactive = false;
  isFinishLoading = false;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private authService: AuthBackendService,
    private contestService: ContestService,
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      note: [null, Validators.required],
    });

    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    if (!this.user) {
      return;
    }

    if (!this.contest) {
      const contestId = this.contestId
        ? this.contestId
        : Helper.getId(<string>this.route.snapshot.paramMap.get('ky-thi'));

      this.contestService
        .getById(contestId)
        .subscribe((contest: ContestModel) => {
          this.contest = contest;
        });
    }

    this.orderService.index().subscribe((orders: Array<OrderModel>) => {
      this.sessionStorageService.store(StoreKeyEnum.Order, orders);

      orders.forEach((item, index) => {
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

      this.isFinishLoading = true;
    });
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

  redirectLoginPage() {
    this.notificationService.warning('Vui lòng đăng nhập!');
    this.router.navigate([Path.SignIn], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  // set isInactive(value: boolean) {
  //   this._isInactive = value;
  //   // this.shouldShowRegisterElement = this.isActive || this.isInactive;
  // }
  //
  // get isInactive(): boolean {
  //   return this._isInactive;
  // }
  //
  // set isActive(value: boolean) {
  //   this._isActive = value;
  //   // this.shouldShowRegisterElement = this.isActive || this.isInactive;
  // }
  //
  // get isActive(): boolean {
  //   return (
  //     this._isActive || (this.shouldShowRegisterElement && this.contest.isFree)
  //   );
  // }
}
