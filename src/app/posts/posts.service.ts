

import { Injectable } from '@angular/core';
import { Post } from './post.module';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AnyArray } from 'mongoose';


@Injectable({providedIn: 'root'})

export class PostsService { // this is a service class that will be used to store the posts array and the postsUpdated observable
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() { // this is a getter method that returns the posts array as a copy of the original array
       this.http
       .get<{message: string , posts: Post[]}>('http://localhost:3000/api/posts')
       .subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
       })
    }

    getPostUpdateListener() { // this is a getter method that returns the postsUpdated as an observable
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) { // this is a method that adds a post to the posts array
        const post: Post = { _id: '' , title : title, content: content };

        this.http.post<{message: string , postId :string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => { // this is a callback function that is executed when the http request is completed
            const id = responseData.postId; 
            post._id = id;
            //console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost (postId: string) {
      this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== postId); // filter out the post that was deleted
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        // console.log('Deleted!');
      });
    }
}
