import { Component, Input} from "@angular/core";
import { Post } from "../post.module";

@Component({
  selector: 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']

})
export class PostListComponenet{

  @Input() posts : Post[] = Array()

}
