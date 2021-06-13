import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SessionStorageService } from 'ngx-webstorage';

import { PostModel } from '@core/models/post.model';
import { PostService } from '@core/services/post.service';
import { Helper } from '@core/helpers/helper';
import { StoreKeyEnum } from '@core/structs/store-key.enum';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PostItemComponent implements OnInit {
  postId: number;
  postTitle: string;
  postContent: SafeHtml;
  post: PostModel;
  isPostBelongToContest: boolean;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private sanitizer: DomSanitizer,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.postId = Helper.getId(<string>this.route.snapshot.paramMap.get('id'));

    this.postService.getById(this.postId).subscribe((post: PostModel) => {
      this.post = post;
      this.isPostBelongToContest = this.post.isContest;
      this.postTitle = post.title;
      this.postContent = this.sanitizer.bypassSecurityTrustHtml(post.content);
    });
  }

  public shouldDisableLink(): boolean {
    return !Helper.isActiveOrder(
      this.sessionStorageService.retrieve(StoreKeyEnum.Order),
      this.post.creatable_id,
    );
  }
}
