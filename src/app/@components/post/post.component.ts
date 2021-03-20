import { Component, Input, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { PostModel } from '@core/models/post.model';
import { PostService } from '@core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  @Input() typeId: string;
  @Input() creatableId: string;
  posts: Array<PostModel>;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    const httpParams = new HttpParams()
      .set('type_id', this.typeId)
      .set('creatable_id', this.creatableId);
    this.postService.index(httpParams).subscribe((posts: Array<PostModel>) => {
      this.posts = posts;
    });
  }
}
