import { Component, Input, OnInit, ElementRef, forwardRef, ViewChild, OnChanges,SimpleChanges} from '@angular/core';
import { ApexAxisChartSeries, ApexPlotOptions,  ApexChart, ChartComponent, ApexFill, ApexStroke, ApexResponsive, ApexXAxis, ApexYAxis, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexTitleSubtitle } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  labels: string[];
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive
};

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
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
    this.chartOptions = {
      series: [
        {
          name: "Current Week",
          data: [40, 30, 50, 70]
        },
        {
          name: "Last week",
          data: [35, 41, 62, 55, 58, 60, 69]
        },
        // {
        //   name: "Total Orders",
        //   data: [80, 57, 74, 99, 75, 38, 62]
        // }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Weekly Orders",
        align: "center"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return `${val}` ;
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return `${val}`;
              }
            }
          },

        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

  
  ngOnInit(): void {
  }

}
