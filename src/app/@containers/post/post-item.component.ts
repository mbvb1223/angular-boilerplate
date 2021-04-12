import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostModel } from '@core/models/post.model';
import { PostService } from '@core/services/post.service';
import { Helper } from '@core/helpers/helper';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
})
export class PostItemComponent implements OnInit {
  postId: number;
  post: PostModel;

  constructor(private route: ActivatedRoute, public postService: PostService) {}

  ngOnInit(): void {
    this.postId = Helper.getId(<string>this.route.snapshot.paramMap.get('id'));

    this.postService.getById(this.postId).subscribe((post: PostModel) => {
      this.post = post;
    });
  }
}
