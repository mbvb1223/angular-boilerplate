import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostModel } from '@core/models/post.model';
import { PostService } from '@core/services/post.service';
import { Helper } from '@core/helpers/helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PostItemComponent implements OnInit {
  postId: number;
  postTitle: string;
  postContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.postId = Helper.getId(<string>this.route.snapshot.paramMap.get('id'));

    this.postService.getById(this.postId).subscribe((post: PostModel) => {
      this.postTitle = post.title;
      this.postContent = this.sanitizer.bypassSecurityTrustHtml(post.content);
    });
  }
}
