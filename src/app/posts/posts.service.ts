

import { Injectable } from '@angular/core';
import { Post } from './post.module';
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { title : title, contente: content };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
