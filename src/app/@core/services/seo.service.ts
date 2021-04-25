import { Injectable } from '@angular/core';

import { Meta, Title } from '@angular/platform-browser';
import { AuthBackendService } from '@core/services/auth-backend.service';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private appTitle: string;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private authService: AuthBackendService,
  ) {
    this.appTitle = this.titleService.getTitle();
  }

  public setData(
    title: string = '',
    description: string = '',
    robots: string = 'index, follow',
  ): void {
    this.titleService.setTitle(
      `${this.appTitle} - ${title} - ${this.authService.getUserName()}`,
    );
    this.metaTagService.updateTag({
      name: 'description',
      content: description,
    });
    this.metaTagService.updateTag({
      name: 'robots',
      content: robots,
    });
  }
}
