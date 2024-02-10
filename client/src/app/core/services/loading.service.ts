import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner"
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingReqCount=0;
  constructor(private spinner: NgxSpinnerService) { }


  loading(){
    this.loadingReqCount++;
     this.spinner.show();
  }

  idle(){
    this.loadingReqCount--;
    if(this.loadingReqCount<=0){
      this.loadingReqCount=0;
      this.spinner.hide();
    }
  }
}
