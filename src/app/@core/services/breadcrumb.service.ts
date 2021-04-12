import { Injectable } from '@angular/core';

import { IBreadcrumbInterface } from '@core/interfaces/breadcrumb.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbObserver: Subject<IBreadcrumbInterface> = new Subject<IBreadcrumbInterface>();

  public setItem(url: string = '', label: string = ''): void {
    this.breadcrumbObserver.next({ url: url, label: label });
  }
}
