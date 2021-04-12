import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Input,
  OnInit,
  Output,
} from '@angular/core';

import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() user: UserModel | null;

  constructor(private authBackendService: AuthBackendService) {}

  ngOnInit(): void {}

  onClickLogout(): void {
    this.authBackendService.logout();
  }
}
