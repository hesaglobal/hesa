import { Component, Input, OnInit, ElementRef, forwardRef, ViewChild, } from '@angular/core';
import { ApexAxisChartSeries,  ApexChart,  ChartComponent,  ApexDataLabels,  ApexPlotOptions,  ApexYAxis,  ApexLegend,  ApexStroke,  ApexXAxis,  ApexFill,  ApexTooltip } from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() list: any[]
  public chartOptions: Partial<ChartOptions>;
  constructor(private element: ElementRef) {


   }


  ngOnInit(): void {
    // chart = $(this.element.nativeElement).find('#chart')
    this.chartOptions = {
      series: [
        {
          name: "Other Queries",
          data: [10, 22, 54, 44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Feedbacks",
          data: [76, 85, 101, 98, 55, 43, 59, 87, 105, 91, 114, 94]
        },
        {
          name: "Partnerships",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 22, 12, 9]
        },
        {
          name: "Complaints",
          data: [14, 20, 50, 31, 31, 39, 36, 25, 58, 32, 43, 21]
        }
      ],
      chart: {
        type: "bar",
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          'Nov',
          'Dec'
        ]
      },
      yaxis: {
        title: {
          text: "Queries "
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return `${val}` //"$ " + val + " thousands";
          }
        }
      }
    };
  }


}
