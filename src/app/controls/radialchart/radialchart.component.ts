import { Component, Input, OnInit, ElementRef, forwardRef, ViewChild, } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions,  ApexChart, ChartComponent, ApexFill, ApexStroke, ApexResponsive } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive
};

@Component({
  selector: 'app-radialchart',
  templateUrl: './radialchart.component.html',
  styleUrls: ['./radialchart.component.scss']
})
export class RadialchartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() options: any = {
    series: [],
    background:"#ffd6da",
    color: "#6c757d",
    fillcolor: ["#f41127"],
    gradientToColors: ["#f41127"]
  }
  public chartOptions: Partial<ChartOptions>;
  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.options.series, //[70],
      chart: this.options.chart || {
        // height: 250,
        type: "radialBar"
      },
      stroke: this.options.stroke,
      responsive: this.options.responsive,
      plotOptions: this.options.plotOptions || {
        radialBar: {
          hollow: {
            background: this.options.background, //"#ffd6da",
            size: "58%"
          },
          dataLabels: {
            name: {
              offsetY: -8,
              show: !0,
              color: this.options.color, // "#6c757d",
              fontSize: "11px"
            },
            value: {
              formatter: function(e) {
                return e +  "%"
              },
              color: "#000",
              fontSize: "15px",
              show: !0,
              offsetY: 10
            }
          }
        }
      },

      fill: this.options.fill || {
        colors: this.options.fillcolor, //["#f41127"],
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: .5,
          gradientToColors: this.options.gradientToColors, //["#f41127"],
          inverseColors: !1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      labels: this.options.labels, //["Complaints"]
    };
    
    
  }


}
