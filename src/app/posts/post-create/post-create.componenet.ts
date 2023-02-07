import { Component, EventEmitter , Output} from "@angular/core";
import { Post } from "../post.module";
@Component({
  selector: 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{

  enterdTitle= "";
  enterdContent = "";

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    const post:Post    = {
      title :  this.enterdTitle,
      contente : this.enterdContent
    };
    this.postCreated.emit(post)
  }
}
