import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { IBreadcrumbInterface } from '@core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  item: IBreadcrumbInterface;

  constructor(
    protected breadcrumbService: BreadcrumbService,
    protected cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbObserver.subscribe(
      (item: IBreadcrumbInterface) => {
        this.item = item;
        this.cd.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {}
}
