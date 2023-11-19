import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {MapLibComponent} from "@org/map-lib";
import * as data from '../assets/taiwan.json'
import {JsonPipe} from "@angular/common";


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MapLibComponent, JsonPipe],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'f2e-map';
  a = data
  ngOnInit(): void {
    console.log(data)
  }

}
