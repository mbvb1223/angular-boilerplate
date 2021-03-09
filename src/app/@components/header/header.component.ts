import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { AuthBackendService } from '@core/services/auth-backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  isLogged: boolean;

  constructor(private authBackendService: AuthBackendService) {}

  ngOnInit(): void {
    // this.authBackendService.isLoggedIn$.subscribe((isLogged: boolean) => {
    //   console.log('bbbbbbbbb', isLogged);
    //   console.log('bbbbbbbbb', this.isLogged);
    //   this.isLogged = isLogged;
    //   console.log('ssssss', this.isLogged);
    // });
  }

  onClickLogout(): void {
    this.logout.emit();
  }
}
