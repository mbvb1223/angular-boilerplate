import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Path } from '@app/@core/structs';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  path = Path;
  isLogged: boolean;

  constructor(private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.isLogged = !!user;
    });
  }

  onClickLogout(): void {
    this.logout.emit();
  }
}
