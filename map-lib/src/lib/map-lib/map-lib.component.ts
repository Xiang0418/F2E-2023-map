import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as d3 from 'd3';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import * as topojson from 'topojson-client';
import {BaseType} from "d3";

@Component({
  selector: 'org-map-lib',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map-lib.component.html',
  styleUrls: ['./map-lib.component.css'],
})
export class MapLibComponent implements OnInit {

  @Input() data?: any;

  ngOnInit(): void {
    let svg = d3.select("svg")
    console.log(svg)
    let g = svg.append("g")
    let projectMethod = d3.geoMercator().center([123, 24]).scale(5500);
    let pathGenerator: any = d3.geoPath().projection(projectMethod);
    d3.json('../../assets/taiwan.json')
      .then((data: any) => {
        console.log("geometries", data.objects["COUNTY_MOI_1090820"].geometries)
        let geometries: any = topojson.feature(data, data.objects["COUNTY_MOI_1090820"])
        for (let i = 0; i < geometries.features.length; i++) {
          geometries.features[i].properties = data.objects["COUNTY_MOI_1090820"].geometries[i].prop
        }
        console.log("geometries", geometries)

        g.append("path")
        const paths = g.selectAll("path").data(geometries.features);
        paths.enter()
          .append("path")
          .attr("d", pathGenerator)
          .attr("class", "county")
          // 加上簡易版本 tooltip
          .append("title")
          .text((d: any) => d.properties["COUNTYNAME"])
      })
  }
}
