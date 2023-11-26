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
    area: '臺北市',
    p1: '鄭紫雲',
    p2: '郭曉風',
    p3: '郭文山',
    p1rate: '57%',
    p2rate: '38.1%',
    p3rate: '61.2%',
    pastElection2020: '53.7%',
    pastElection2018: '49.5%',
    pastElection2016: '61.2%',
  },
  {
    area: '花蓮縣',
    p1: '鄭紫雲',
    p2: '郭曉風',
    p3: '郭文山',
    p1rate: '27%',
    p2rate: '18.1%',
    p3rate: '81.2%',
    pastElection2020: '23.7%',
    pastElection2018: '39.5%',
    pastElection2016: '41.2%',
  }];

  colorArray: any[] = [
    {
      area: '臺北市',
      fill: '#F0D574',
    },
    {
      area: '新北市',
      fill: '#5195C7',
    },
    {
      area: '桃園市',
      fill: '#EBD070',
    },
    {
      area: '臺中市',
      fill: '#84D677',
    },
    {
      area: '臺南市',
      fill: '#EAD897',
    },
    {
      area: '高雄市',
      fill: '#6CC25E',
    },
    {
      area: '新竹縣',
      fill: '#6CC25E',
    },
    {
      area: '苗栗縣',
      fill: '#85C979',
    },
    {
      area: '彰化縣',
      fill: '#ECC848',
    },
    {
      area: '南投縣',
      fill: '#EEC020',
    },
    {
      area: '雲林縣',
      fill: '#ABC6DA',
    },
    {
      area: '嘉義縣',
      fill: '#9DD195',
    },
    {
      area: '屏東縣',
      fill: '#EEC020',
    },
    {
      area: '宜蘭縣',
      fill: '#EEC020',
    },
    {
      area: '花蓮縣',
      fill: '#6FA5CD',
    },
    {
      area: '臺東縣',
      fill: '#8DB6D4',
    },
    {
      area: '澎湖縣',
      fill: '#F0D574',
    },
    {
      area: '金門縣',
      fill: '#F0D574',
    },
    {
      area: '連江縣',
      fill: '#F0D574',
    },
    {
      area: '基隆市',
      fill: '#6CC25E',
    },
    {
      area: '新竹市',
      fill: '#E8DFBF',
    },
    {
      area: '嘉義市',
      fill: '#E8DFBF',
    },
  ]

  newInfo?: any[] = []


  ngOnInit(): void {
    let svg = d3.select("svg");
    console.log(svg);
    let g = svg.append("g");
    let projectMethod = d3.geoMercator().center([123, 24]).scale(8000);
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
          .attr("fill", (d: any) => this.colorArray.find((x)=>x.area === d.properties.COUNTYNAME).fill)
          .style("stroke",'white')
          .on('click', (event, d: any) => {
            const externalData = this.areaInfo;
            this.newInfo = externalData?.filter(x => x.area === d.properties.COUNTYNAME)
          })
          .append("title")
          .text((d: any) => d.properties["COUNTYNAME"])
      });



  }
}
