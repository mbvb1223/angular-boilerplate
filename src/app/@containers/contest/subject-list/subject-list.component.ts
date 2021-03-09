import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { SubjectModel } from '@core/models/subject.model';
import { ContestModel } from '@core/models/contest.model';
import { NotificationService } from '@core/services/notification.service';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';
import { Path } from '@core/structs';

@Component({
  templateUrl: './subject-list.component.html',
  styleUrls: [],
})
export class SubjectListComponent implements OnInit, OnDestroy {
  subjects: Array<SubjectModel>;
  contestId: number;
  contest: ContestModel;
  private currentUser: UserModel | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private notificationService: NotificationService,
    public authService: AuthBackendService,
  ) {
    this.contestId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;
      });

    this.contestService
      .getSubjects(this.contestId)
      .subscribe((subjects: Array<SubjectModel>) => {
        this.subjects = subjects;
      });
  }

  ngOnDestroy(): void {}

  goToSubject(subjectId: number): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.router.navigate([Path.Subject, subjectId]);
      return;
    }

    this.notificationService.warning('Vui lòng đăng nhập!');
    this.router.navigate([Path.SignIn], {
      queryParams: { redirect: this.router.url },
    });
  }
}
