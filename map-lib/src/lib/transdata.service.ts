import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransdataService {
  data?:string='';

  // private dataSubject = new Subject<any>();
  private dataSubject = new BehaviorSubject<any>(null);

  sendData(data: any) {
    console.log(data)
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }

    // 存放Input資料
    // setData(data?: any) {
    //   console.log('setData',data)
    //   this.dataSubject.next(data);
    // }

    // get Transdata() {
    //   const data = this.dataSubject.value;
    //   this.setData(undefined);
    //   return data;
    // }


  constructor() { }

}
