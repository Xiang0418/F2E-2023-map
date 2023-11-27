import { TransdataService } from './../../../../map-lib/src/lib/transdata.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CountyDetailComponent, MapLibComponent } from '@org/map-lib';
import * as data from '../assets/taiwan.json';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    MapLibComponent,
    JsonPipe,
    CountyDetailComponent,
    NgIf,
  ],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'f2e-map';
  a = data;
  show: boolean = false;

  constructor(
    private transdataService:TransdataService
  ){

  }

  ngOnInit(): void {
    this.transdataService.getData()
  }
}
