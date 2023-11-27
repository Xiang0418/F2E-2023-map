import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransdataService } from '../transdata.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'county-detail',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './county-detail.component.html',
  styleUrls: ['./county-detail.component.css'],
})
export class CountyDetailComponent  {
  receivedData: any;
  private subscription: Subscription;

  constructor(
    private transdataService:TransdataService
  ) {
    this.subscription = this.transdataService.getData().subscribe(data => {
      this.receivedData = data;
      console.log(this.receivedData,'this.receiveData')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
