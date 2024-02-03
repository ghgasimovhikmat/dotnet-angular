import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalcount?: number;
  @Input() pageSize?: number;
  @Input() pageNumber?: number;

  @Output() pageChanged = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  onPageChanged(event:any){
   this.pageChanged.emit(event.page);
  }

}
