import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'county-detail',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './county-detail.component.html',
  styleUrls: ['./county-detail.component.css'],
})
export class CountyDetailComponent  {
  constructor() {}


}
