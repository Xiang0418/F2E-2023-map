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

  pColor = [
    {
      name: '鄭紫雲',
      fill: '#F0D574'
    },
    {
      name: '郭曉風',
      fill: '#5195C7'
    },
    {
      name: '郭文山',
      fill: '#84D677'
    }

  ]
  newInfo?: any = null

  history = [
    {
      "name": '綠',
      "fill": '#84D677'
    },
    {
      "name": '進',
      "fill": '#F0D574'
    },
    {
      "name": '藍',
      "fill": '#5195C7'
    },
  ]
  historyData: any = {}


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
        d3.json('../../assets/vote/votes_2016.json').then((votes2016: any) => {
          d3.json('../../assets/vote/votes_2020.json').then((votes2020: any) => {
            for (let i = 0; i < geometries.features.length; i++) {
              geometries.features[i].vote = votes2020[geometries.features[i].properties['COUNTYNAME']]
              geometries.features[i].vote2016 = votes2016[geometries.features[i].properties['COUNTYNAME']]
            }

            console.log("load success")
            g.append("path")
            const paths = g.selectAll("path").data(geometries.features);
            paths.enter()
              .append("path")
              .attr("d", pathGenerator)
              .attr("class", "county")
              .attr("fill", (d: any) => {
                console.log(d)
                let max = Math.max(d.vote.Percentage_Candidate1, d.vote.Percentage_Candidate2, d.vote.Percentage_Candidate3)
                if (d.vote.Percentage_Candidate1 == max) return this.pColor[0].fill;
                if (d.vote.Percentage_Candidate2 == max) return this.pColor[1].fill;
                return this.pColor[2].fill;
              })
              .style("stroke", 'white')
              .on('click', (event, d: any) => {
                d.vote.countyName = d.properties.COUNTYNAME
                this.newInfo = d.vote
                console.log(d.vote.countyName)
                this.historyData.v2020 = this.getWinColor(votes2020[d.vote.countyName])
                this.historyData.v2016 = this.getWinColor(votes2016[d.vote.countyName])
              })
              .append("title")
              .text((d: any) => d.properties["COUNTYNAME"])
          })
        })
        console.log("geometries", geometries)
      });


  }

  getWinColor(vote: any) {
    console.log(vote)
    let max = Math.max(vote.Percentage_Candidate1, vote.Percentage_Candidate2, vote.Percentage_Candidate3)
    if (vote.Percentage_Candidate1 == max) return {'name': 'assets/Group 2-y.svg', 'fill': this.pColor[0].fill, 'per': max};
    else if (vote.Percentage_Candidate2 == max) return {'name': 'assets/Group 2-b.svg', 'fill': this.pColor[1].fill, 'per': max};
    else return {'name': 'assets/Group 2-g.svg', 'fill': this.pColor[2].fill, 'per': max};
  }
}
