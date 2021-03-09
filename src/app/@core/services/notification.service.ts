import { Injectable } from '@angular/core';

import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snotifyService: SnotifyService) {}

  success(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'success',
      },
    });
  }

  error(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'error',
      },
    });
  }

  simple(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'simple',
      },
    });
  }

  warning(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'warning',
      },
    });
  }

  info(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'info',
      },
    });
  }

  confirm(
    title: string,
    body?: string,
    position: SnotifyPosition = SnotifyPosition.rightTop,
  ): void {
    this.snotifyService.create({
      title: title,
      body: body,
      config: {
        titleMaxLength: 5555,
        position: position,
        type: 'confirm',
      },
    });
  }
}
