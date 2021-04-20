import { Component, Input, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { PostModel } from '@core/models/post.model';
import { PostService } from '@core/services/post.service';
import { Helper } from '@core/helpers/helper';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectModel } from '@core/models/subject.model';
import { ContestModel } from '@core/models/contest.model';
import { StoreKeyEnum } from '@core/structs/store-key.enum';
import { SessionStorageService } from 'ngx-webstorage';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  @Input() typeId: string;
  @Input() creatableId: string;
  @Input() parentObject: SubjectModel | ContestModel;
  posts: Array<PostModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    const httpParams = new HttpParams()
      .set('type_id', this.typeId)
      .set('creatable_id', this.creatableId);
    this.postService.index(httpParams).subscribe((posts: Array<PostModel>) => {
      this.posts = posts;
    });
  }

  goToPost(post: PostModel) {
    if (post.isVip && parseInt(this.typeId) === PostModel.TYPE_CONTEST) {
      if (
        !Helper.isActiveOrder(
          this.sessionStorageService.retrieve(StoreKeyEnum.Order),
          parseInt(this.creatableId),
        )
      ) {
        this.notificationService.warning(
          'Vui lòng mua khóa học để xem được tài liệu này',
        );
        return;
      }
    }
    this.router.navigate([
      'bai-viet',
      Helper.convertToUrl(this.parentObject.title, this.parentObject.id),
      Helper.convertToUrl(post.title, post.id),
    ]);
  }
}
