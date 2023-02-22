import { Component, OnInit, OnDestroy} from "@angular/core";
import { Post } from "../post.module";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']

})

export class PostListComponenet implements OnInit, OnDestroy{

  posts : Post[] = Array();

  private postSub : Subscription = new Subscription();

  constructor(public postService: PostsService) {}

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  ngOnInit(){
      this.posts = this.postService.getPosts();
      this.postSub =  this.postService.getPostUpdateListener().
      subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
}
