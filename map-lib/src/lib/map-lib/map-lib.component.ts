import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import * as topojson from 'topojson-client';
import { BaseType } from "d3";

@Component({
  selector: 'org-map-lib',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map-lib.component.html',
  styleUrls: ['./map-lib.component.css'],
})
export class MapLibComponent implements OnInit {

  @Input() data?: any;

  areaInfo?: any[] = [{
    area:'台北市',
    p1:'鄭紫雲',
    p2:'郭曉風',
    p3:'郭文山',
    p1rate:'57%',
    p2rate:'38.1%',
    p3rate:'61.2%',
    pastElection2020:'53.7%',
    pastElection2018:'49.5%',
    pastElection2016:'61.2%',
  }];



  ngOnInit(): void {
    let svg = d3.select("svg");
    console.log(svg);
    let g = svg.append("g");
    let projectMethod = d3.geoMercator().center([123, 24]).scale(8000);
    let pathGenerator: any = d3.geoPath().projection(projectMethod);

    let customColors = ["#EEC020", "#5195C7", "#6CC25E", "#9DD195", "#ABC6DA","#EAD897","#84D677"];
    // // 創建一個顏色比例尺
    // let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let colorScale = d3.scaleOrdinal().range(customColors);

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
          // 使用顏色比例尺為每個區塊選擇顏色
          .attr("fill", (d: any, i: any) => String(colorScale(i)))
          // 加上簡易版本 tooltip
          .append("title")
          .text((d: any) => d.properties["COUNTYNAME"])
      });
  }
}
