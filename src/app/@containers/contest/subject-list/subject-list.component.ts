import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContestService } from '@core/services/contest.service';
import { SubjectModel } from '@core/models/subject.model';
import { ContestModel } from '@core/models/contest.model';
import { NotificationService } from '@core/services/notification.service';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';
import { Path } from '@core/structs';
import { Helper } from '@core/helpers/helper';
import { PostsService } from '@core/services/posts.service';
import { PostModel } from '@core/models/post.model';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './subject-list.component.html',
  styleUrls: [],
})
export class SubjectListComponent implements OnInit, OnDestroy {
  subjects: Array<SubjectModel>;
  contestId: number;
  contest: ContestModel;
  posts: Array<PostModel>;
  private currentUser: UserModel | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private postService: PostsService,
    private notificationService: NotificationService,
    public authService: AuthBackendService,
  ) {}

  ngOnInit(): void {
    this.contestId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('id'),
    );
    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;
      });

    const httpParams = new HttpParams()
      .set('type_id', PostModel.TYPE_CONTEST.toString())
      .set('creatable_id', this.contestId.toString());
    this.postService.index(httpParams).subscribe((posts: Array<PostModel>) => {
      this.posts = posts;
    });

    this.contestService
      .getSubjects(this.contestId)
      .subscribe((subjects: Array<SubjectModel>) => {
        this.subjects = subjects;
      });
  }

  ngOnDestroy(): void {}

  goToSubject(subject: SubjectModel): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.router.navigate([
        Helper.convertToUrl(this.contest.title, this.contest.id),
        'mon-thi',
        Helper.convertToUrl(subject.title, subject.id),
      ]);
      return;
    }

    this.notificationService.warning('Vui lòng đăng nhập!');
    this.router.navigate([Path.SignIn], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
