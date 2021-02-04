import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-entry',
  templateUrl: './comment-entry.component.html',
  styleUrls: ['./comment-entry.component.css']
})
export class CommentEntryComponent implements OnInit {
  @Input()
  userName!: any;
  @Input()
  commentText!: string;
  @Input()
  commentId!: number;
  @Input()
  userId!: number;
  @Output()
  refresh =  new EventEmitter();

  editable: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let local = localStorage.getItem("user");
    if(typeof local === "string"){
      let user = JSON.parse(local).id;
      this.editable = this.userId === user;
    }

  }

  deleteComment(){
    this.apiService.deleteCommentById(this.commentId).subscribe(
      (data)=>{
        this.refresh.emit();
      }
    );
  }

  updateComment(){
    console.log('update');
  }

}
