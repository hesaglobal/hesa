import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink'
import * as Highcharts from 'highcharts';
import { AuthService } from '@app/services/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  updateFromInput: Boolean = false;
  private subs = new SubSink();
  lineChartSeries: any = {};
  public currentUser:any;
  public ecommerceModuleAccess:Boolean=false;
  public enrollmentModuleAccess:Boolean=false;
  public pieChart: typeof Highcharts = Highcharts;
  public orderOptions: any = {
    chart: {
      height: 350,
      type: "line"
    },
    series: [
      {
        name: "Current Week",
        data: [40, 30, 50, 70]
      },
      {
        name: "Last week",
        data: [35, 41, 62, 55, 58, 60, 69]
      }
    ],
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
    yAxis: {
      title: {
        text: 'Number of Orders'
      }
    },
    xAxis: {
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
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return `${val}`;
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return `${val}`;
            }
          }
        },

      ]
    },
    grid: {
      borderColor: "#f1f1f1"
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
  public totaloptions: any = {
    series: [5028],
    background: '#ffd6da',
    color: '#17a00e',
    // fillcolor: ['#f41127'],
    // gradientToColors: ['#f41127'],
    labels: ['Total Queries'],
    chart: {
      height: 250,
      type: "radialBar",
      offsetY: -10
    },
    stroke: {
      dashArray: 4
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        }
      }
    }],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "55%",
          background: "transparent"
        },
        track: {
          strokeWidth: "100%",
          dropShadow: {
            enabled: !1,
            top: -3,
            left: 0,
            blur: 4,
            opacity: .12
          }
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "#212529",
            offsetY: 5
          },
          value: {
            offsetY: 20,
            fontSize: "30px",
            color: "#212529",
            formatter: function (e) {
              return e + '' // + "%"
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: .15,
        inverseColors: !1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    }
  }

  public complaintoptions: any = {
    series: [37.6],
    background: '#ffd6da',
    color: '#6c757d',
    fillcolor: ['#f41127'],
    // gradientToColors: ['#f41127'],
    labels: ['Complaints']
  }
  enrollmentChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: "Weekly Enrollments",
      align: "center"
    },
    xAxis: {
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ],
    },
    series: [
      {
        name: "Current Week",
        type: "line",
        data: [20, 30, 40, 87, 32, 88, 30]
      },
      {
        name: "Last week",
        type: "line",
        data: [35, 41, 62, 55, 58, 60, 69]
      },
    ],
  }
  lineChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: "Weekly Orders",
      align: "center"
    },
    xAxis: {
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ],
    },
    series: [
      {
        name: "Current Week",
        type: "line",
        data: [40, 30, 50, 70]
      },
      {
        name: "Last week",
        type: "line",
        data: [35, 41, 62, 55, 58, 60, 69]
      },
    ],

  };
  ecommercePieOptions: Highcharts.Options = {

    chart: {
      height: 350,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: !1,
      type: "pie",
      styledMode: !0
    },
    credits: {
      enabled: !1
    },
    title: {
      text: "Orders"
    },
    subtitle: {
      text: "Orders by status"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>"
    },
    // accessibility: {
    //     point: {
    //         // valueSuffix: "%"
    //     }
    // },
    plotOptions: {
      pie: {
        allowPointSelect: !0,
        cursor: "pointer",
        innerSize: 120,
        dataLabels: {
          enabled: !0,
          format: "<b>{point.name}</b>: {point.y} "
        },
        showInLegend: !0
      }
    },
    series: [{
      name: "Orders",
      type: "pie",
      // colorByPoint: !0,
      data: [{
        name: "Due",
        y: 15
      }, {
        name: "Accepted",
        y: 5
      }, {
        name: "Shipped",
        y: 10
      }, {
        name: "Delivered",
        y: 30
      }, {
        name: "Rejected",
        y: 2
      }]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            pie: {
              innerSize: 100,
              dataLabels: {
                enabled: !1
              }
            }
          }
        }
      }]
    }
  };
  sentimentsPieCharts: Highcharts.Options = {

    chart: {
      height: 350,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: !1,
      type: "pie",
      styledMode: !0
    },
    credits: {
      enabled: !1
    },
    title: {
      text: "Public Sentiments"
    },
    subtitle: {
      text: "Sentiments by Age Groups"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>"
    },
    // accessibility: {
    //     point: {
    //         // valueSuffix: "%"
    //     }
    // },
    plotOptions: {
      pie: {
        allowPointSelect: !0,
        cursor: "pointer",
        innerSize: 120,
        dataLabels: {
          enabled: !0,
          format: "<b>{point.name}</b>: {point.y} "
        },
        showInLegend: !0
      }
    },
    series: [{
      name: "Public Sentiments",
      type: "pie",
      // colorByPoint: !0,
      data: [{
        name: "Delighted",
        y: 15
      }, {
        name: "Happy",
        y: 5
      }, {
        name: "Neutral",
        y: 10
      }, {
        name: "Negative",
        y: 30
      }, {
        name: "Flurious",
        y: 2
      }]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            pie: {
              innerSize: 100,
              dataLabels: {
                enabled: !1
              }
            }
          }
        }
      }]
    }
  };
  enrollmentPieOptions: Highcharts.Options = {

    chart: {
      height: 350,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: !1,
      type: "pie",
      styledMode: !0
    },
    credits: {
      enabled: !1
    },
    title: {
      text: "Enrollments"
    },
    subtitle: {
      text: "Enrollments by age groups"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>"
    },
    // accessibility: {
    //     point: {
    //         // valueSuffix: "%"
    //     }
    // },
    plotOptions: {
      pie: {
        allowPointSelect: !0,
        cursor: "pointer",
        innerSize: 120,
        dataLabels: {
          enabled: !0,
          format: "<b>{point.name}</b>: {point.y} "
        },
        showInLegend: !0
      }
    },
    series: [{
      name: "Enrollments",
      type: "pie",
      // colorByPoint: !0,
      data: [{
        name: "18-24 Years",
        y: 25
      }, {
        name: "24-32 Years",
        y: 20
      }, {
        name: "32-40 Years",
        y: 15
      }, {
        name: "40-50 Years",
        y: 30
      }, {
        name: "50+ Years",
        y: 10
      }]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            pie: {
              innerSize: 100,
              dataLabels: {
                enabled: !1
              }
            }
          }
        }
      }]
    }
  };
  consistencySplitOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Top 10 Issues'
    },
    xAxis: {
      categories: ["18-24 Years","24-32 Years","32-40 Years", "40-50 Years", "50+ Years"]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Issues'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
//     'Health',
//  'Crime', 
// 'Education',
//  'Employment',
//  'Corruption', 
// 'Development', 
// 'Roads', 
// 'Waters', 
// 'Pension', 
// 'Cleaniless'
    series: [{
      type: "bar",
      name:"Health",
      data: [20,30,22,44,12]
    }, {
      type: "bar",
      name:"Crime",
      data: [11,22,21,5,19]
    }, {
      type: "bar",
      name:"Education",
      data: [32,11,16,32,11]
    },
    {
      type: "bar",
      name:"Employment",
      data: [19,15,13,54,22]
    }, {
      type: "bar",
      name:"Corruption",
      data: [12,43,22,11,10]
    }, {
      type: "bar",
      name:"Development",
      data: [54,12,14,9,10]
    },
    {
      type: "bar",
      name:"Roads",
      data: [22,14,16,19,32]
    }, {
      type: "bar",
      name:"Waters",
      data: [43,22,10,19,10]
    }, {
      type: "bar",
      name:"Pension",
      data: [54,12,32,10,9]
    }, {
      type: "bar",
      name:"Cleaniless",
      data: [15,19,22,10,9]
    }]
  }
  public feedbackoptions: any = {
    series: [22.5],
    background: '#CEFFCB',
    color: '#6c757d',
    fillcolor: ['#17a00e'],
    // gradientToColors: ['#17a00e'],
    labels: ['Feedbacks']
  }

  public partnershipoptions: any = {
    series: [10],
    background: '#FFEDB7',
    color: '#6c757d',
    fillcolor: ['#ffc107'],
    // gradientToColors: ['#ffc107'],
    labels: ['Partnerships']
  }

  public othersoptions: any = {
    series: [29.8],
    background: '#ABCDFF',
    color: '#6c757d',
    fillcolor: ['#0d6efd'],
    // gradientToColors: ['#ffc107'],
    labels: ['Others']
  }
  // Chart 2

  // Queries this week
  public QueriesBar: typeof Highcharts = Highcharts;
  public LineCharts: typeof Highcharts = Highcharts;
  public BarCharts: typeof Highcharts = Highcharts
  dashboardData: any;

  queriesBarOptions: Highcharts.Options = {

    chart: {
      type: "bar",
      styledMode: !0
    },
    credits: {
      enabled: !1
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: !1
        }
      }
    },
    title: {
      text: "Queries this week"
    },
    xAxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      min: 0,
      title: {
        text: "Queries this week",
        style: {
          display: "none"
        }
      }
    },
    legend: {
      reversed: !1
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: [
      {
        type: "bar",
        name: "Others",
        data: [13, 24, 14, 22, 15, 28, 12]
      },
      {
        type: "bar",
        name: "Complaints",
        data: [22, 12, 23, 52, 11, 18, 22]
      },
      {
        type: "bar",
        name: "Partnerships",
        data: [12, 12, 13, 12, 11, 18, 12]
      },
      {
        type: "bar",
        name: "Feedbacks",
        data: [15, 13, 14, 17, 12, 18, 12]
      }
    ]

  };

  piechartOptions: Highcharts.Options = {

    chart: {
      height: 350,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: !1,
      type: "pie",
      styledMode: !0
    },
    credits: {
      enabled: !1
    },
    title: {
      text: "Queries"
    },
    subtitle: {
      text: "Queries by type"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: !0,
        cursor: "pointer",
        innerSize: 120,
        dataLabels: {
          enabled: !0,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %"
        },
        showInLegend: !0
      }
    },
    series: [{
      name: "Queries",
      type: "pie",
      // colorByPoint: !0,
      data: [{
        name: "Other Queries",
        y: 29.83
      }, {
        name: "Complaints",
        y: 37.62
      }, {
        name: "Partnership Queries",
        y: 10
      }, {
        name: "Feedbacks",
        y: 22.51
      }]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            pie: {
              innerSize: 100,
              dataLabels: {
                enabled: !1
              }
            }
          }
        }
      }]
    }
  };

  constructor(private dataServices: DataService,public authservice:AuthService) { }

  ngOnInit(): void {
    this.getDashboardValues();
    this.currentUser=this.authservice.getUserData();
    this.ecommerceModuleAccess=this.currentUser.modules.includes("Ecommerce") ? true : false;
    this.enrollmentModuleAccess=this.currentUser.modules.includes("Enrollment") ? true : false;
   }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  getDashboardValues() {
    this.subs.add(this.dataServices.callAPI("get", {}, `client/dashboard`).subscribe(
      res => {
        if (res.status) {
          this.totaloptions["newseries"] = [res.data.totalCustomerCareQueries];
          this.feedbackoptions["newseries"] = [res.data.totalFeedbackQueries];
          this.othersoptions["newseries"] = [res.data.totalOthersQueries];
          this.complaintoptions["newseries"] = [res.data.totalComplaintQueries];
          this.partnershipoptions["newseries"] = [res.data.totalPartnerShipQueries];
          this.ecommercePieOptions.series = [{
            name: "Orders",
            type: "pie",
            // colorByPoint: !0,
            data: [{
              name: "Due",
              y: res.data.totalDueOrders
            }, {
              name: "Accepted",
              y: res.data.totalAcceptedOrders
            }, {
              name: "Shipped",
              y: res.data.totalShippedOrders
            }, {
              name: "Delivered",
              y: res.data.totalDeliveredOrders
            }, {
              name: "Rejected",
              y: res.data.totalRejectedOrders
            }]
          }]
          this.piechartOptions.series = [{
            name: "Queries",
            type: "pie",
            // colorByPoint: !0,
            data: [{
              name: "Other Queries",
              y: res.data.totalCustomerCareQueries / res.data.totalOthersQueries
            }, {
              name: "Complaints",
              y: res.data.totalCustomerCareQueries / res.data.totalComplaintQueries
            }, {
              name: "Partnership Queries",
              y: res.data.totalCustomerCareQueries / res.data.totalPartnerShipQueries
            }, {
              name: "Feedbacks",
              y: res.data.totalCustomerCareQueries / res.data.totalFeedbackQueries
            }]
          }];
          this.orderOptions.series = [
            {
              name: "Current Week",
              data: res.data.orderLatestWeek
            },
            {
              name: "Last week",
              data: res.data.orderPreviousWeek
            }];
          this.queriesBarOptions.series = res.data.queriesPerWeek
          this.lineChartOptions.series = [
            {
              name: "Current Week",
              type: "line",
              data: res.data.orderLatestWeek
            },
            {
              name: "Last week",
              type: "line",
              data: res.data.orderPreviousWeek
            },
          ]
          this.updateFromInput = true;
        }
      }))
  }
  sentimentsByCountry(event: any) {
    let city = event.target.value;
    switch (city.toLowerCase()) {
      case "kalka":
        this.sentimentsPieCharts.series = [{
          name: "Public Sentiments",
          type: "pie",
          // colorByPoint: !0,
          data: [{
            name: "Delighted",
            y: 18
          }, {
            name: "Happy",
            y: 10
          }, {
            name: "Neutral",
            y: 44
          }, {
            name: "Negative",
            y: 20
          }, {
            name: "Flurious",
            y: 11
          }]
        }]
        this.consistencySplitOptions.series = [{
          type: "bar",
          name:"Health",
          data: [32,11,16,32,11]
        }, {
          type: "bar",
          name:"Crime",
          data: [19,15,13,54,22]
        }, {
          type: "bar",
          name:"Education",
          data: [54,12,14,9,10]
        },
        {
          type: "bar",
          name:"Employment",
          data: [43,22,10,19,10]
        }, {
          type: "bar",
          name:"Corruption",
          data: [12,43,22,11,10]
        }, {
          type: "bar",
          name:"Development",
          data: [15,19,22,10,9]
        },
        {
          type: "bar",
          name:"Roads",
          data:[54,12,32,10,9]
        }, {
          type: "bar",
          name:"Waters",
          data: [27,32,10,19,18]
        }, {
          type: "bar",
          name:"Pension",
          data:  [37,23,10,18,17]
        }, {
          type: "bar",
          name:"Cleaniless",
          data:  [45,32,6,11,17] 
        }]
        break;
      case "panchkula":
        this.sentimentsPieCharts.series = [{
          name: "Public Sentiments",
          type: "pie",
          // colorByPoint: !0,
          data: [{
            name: "Delighted",
            y: 20
          }, {
            name: "Happy",
            y: 22
          }, {
            name: "Neutral",
            y: 28
          }, {
            name: "Negative",
            y: 10
          }, {
            name: "Flurious",
            y: 20
          }]
        }]
        this.consistencySplitOptions.series = [{
          type: "bar",
          name: "Health",
          data: [30, 18, 25, 20, 15]
      }, {
          type: "bar",
          name: "Crime",
          data: [20, 22, 15, 18, 20]
      }, {
          type: "bar",
          name: "Education",
          data: [35, 15, 20, 30, 14]
      },
      {
          type: "bar",
          name: "Employment",
          data: [25, 20, 18, 60, 30]
      }, {
          type: "bar",
          name: "Corruption",
          data: [15, 50, 30, 18, 15]
      }, {
          type: "bar",
          name: "Development",
          data: [60, 15, 18, 12, 15]
      },
      {
          type: "bar",
          name: "Roads",
          data: [28, 18, 20, 25, 40]
      }, {
          type: "bar",
          name: "Waters",
          data: [50, 25, 15, 28, 15]
      }, {
          type: "bar",
          name: "Pension",
          data: [60, 15, 40, 15, 12]
      }, {
          type: "bar",
          name: "Cleanliness",
          data: [20, 25, 30, 15, 12]
      }];
      



        break;
      case "karnal":
        this.sentimentsPieCharts.series = [{
          name: "Public Sentiments",
          type: "pie",
          // colorByPoint: !0,
          data: [{
            name: "Delighted",
            y: 25
          }, {
            name: "Happy",
            y: 45
          }, {
            name: "Neutral",
            y: 20
          }, {
            name: "Negative",
            y: 7
          }, {
            name: "Flurious",
            y: 3
          }]
        }]
        this.consistencySplitOptions.series = [{
          type: "bar",
          name: "Health",
          data: [28, 15, 20, 18, 22]
      }, {
          type: "bar",
          name: "Crime",
          data: [12, 25, 18, 20, 15]
      }, {
          type: "bar",
          name: "Education",
          data: [30, 22, 15, 25, 18]
      },
      {
          type: "bar",
          name: "Employment",
          data: [18, 20, 25, 15, 22]
      }, {
          type: "bar",
          name: "Corruption",
          data: [10, 15, 12, 18, 20]
      }, {
          type: "bar",
          name: "Development",
          data: [22, 18, 15, 20, 25]
      },
      {
          type: "bar",
          name: "Roads",
          data: [20, 25, 18, 22, 15]
      }, {
          type: "bar",
          name: "Waters",
          data: [15, 18, 20, 22, 25]
      }, {
          type: "bar",
          name: "Pension",
          data: [18, 25, 20, 15, 22]
      }, {
          type: "bar",
          name: "Cleanliness",
          data: [25, 20, 22, 15, 18]
      }];
      

        break;
      default:
        this.sentimentsPieCharts.series= [{
          name: "Public Sentiments",
          type: "pie",
          // colorByPoint: !0,
          data: [{
            name: "Delighted",
            y: 15
          }, {
            name: "Happy",
            y: 5
          }, {
            name: "Neutral",
            y: 10
          }, {
            name: "Negative",
            y: 30
          }, {
            name: "Flurious",
            y: 2
          }]
        }]
        this.consistencySplitOptions.series = [{
          type: "bar",
          name: "Health",
          data: [20, 22, 25, 18, 15]
      }, {
          type: "bar",
          name: "Crime",
          data: [15, 18, 20, 22, 25]
      }, {
          type: "bar",
          name: "Education",
          data: [25, 20, 18, 15, 22]
      },
      {
          type: "bar",
          name: "Employment",
          data: [18, 22, 25, 20, 15]
      }, {
          type: "bar",
          name: "Corruption",
          data: [22, 15, 20, 18, 25]
      }, {
          type: "bar",
          name: "Development",
          data: [20, 25, 18, 15, 22]
      },
      {
          type: "bar",
          name: "Roads",
          data: [15, 18, 22, 20, 25]
      }, {
          type: "bar",
          name: "Waters",
          data: [18, 20, 25, 15, 22]
      }, {
          type: "bar",
          name: "Pension",
          data: [25, 22, 20, 15, 18]
      }, {
          type: "bar",
          name: "Cleanliness",
          data: [22, 18, 15, 25, 20]
      }];
      
    }
    this.updateFromInput = true;

  }
}
