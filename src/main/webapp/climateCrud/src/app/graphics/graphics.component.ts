import {Component, OnDestroy} from '@angular/core';
import { ClimateService } from 'src/app/services/climate.service';
import * as Highcharts from 'highcharts';
import {from, Observable, Subject} from "rxjs";
import {Climate} from "../climates/climates.component";
import {groupBy, mergeMap, takeUntil, toArray} from "rxjs/operators";
import {Events, Media, Text, TimelineData, Title} from "./timeline-model";
//import * as TL from '../../assets/timeline3/js/timeline.js'

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
})
export class GraphicsComponent implements OnDestroy {

  public _endSubscriptions$: Subject<boolean> = new Subject();

  Highcharts = Highcharts;

  chartOptions: {};

  chartDateOptions: {};

  bookNameMap = new Map();

  climates: Climate[] = [
    {
      "id": 1,
      "date": "1788-05-08",
      "originalDate": "1788-05-08",
      "text": "... ‘Veba hastalığının aşırı salgın halde değilse de başkentte sürdüğünü ‘",
      "place": "İstanbul",
      "pageNumber": "26",
      "bookName": "book3",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": true,
      "monthExist": true,
      "dayExist": true
    },
    {
      "id": 2,
      "date": "1788-05-31",
      "originalDate": "1788-05-08",
      "text": "31 Mayıs’ ta İspanya temsılcısı sıcakla birlikte Frenk mahallesinde vebanın daha da yayıldığını...",
      "place": "İstanbul",
      "pageNumber": "35",
      "bookName": "book2",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": false,
      "monthExist": false,
      "dayExist": false
    },
    {
      "id": 3,
      "date": "1788-06-04",
      "originalDate": "1788-05-08",
      "text": "... gece bastırırken Galata’ da 5 kişinin vebadan öldğğünü öğrendikleri Pera’ ya döndüler.",
      "place": "İstanbul/Galata",
      "pageNumber": "36",
      "bookName": "book1",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": true,
      "monthExist": false,
      "dayExist": true
    },
    {
      "id": 4,
      "date": "1788-06-08",
      "originalDate": "1788-05-08",
      "text": "8 Haziran’ da hareketi olanasızlaştıracak derecee güney rüzgarı etili oldu. ",
      "place": "İstanbul/Galata",
      "pageNumber": "36",
      "bookName": "book2",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": true,
      "monthExist": true,
      "dayExist": false
    },
    {
      "id": 5,
      "date": "1788-06-08",
      "originalDate": "1788-05-08",
      "text": "8 Haziran’ da hareketi olanasızlaştıracak derecee güney rüzgarı etili oldu. ",
      "place": "İstanbul/Galata",
      "pageNumber": "36",
      "bookName": "book2",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": true,
      "monthExist": true,
      "dayExist": true
    }
  ];


  /**
   * Observable of the account state.
   *
   */
  public climates$: Observable<Climate[]> = this.climateService.getClimates()
    .pipe(
      takeUntil(this._endSubscriptions$)
    );

  constructor(private climateService: ClimateService) {
    this.climates$.subscribe(data => {
      this.climates = data;

      from(this.climates).pipe(
        groupBy(climate => climate.bookName),
        mergeMap(group => group.pipe(toArray()))
      ).subscribe((data) => this.bookNameMap.set(data[0].bookName, data.length));


      this.generateBookNameGraph();
      this.generateDateGraph();

      let title: Title = {
        media: {
          url: "https://lh3.googleusercontent.com/proxy/ehJLmf3k83E5uCMlTOoAsWZ3ZDGk0lTJEXqGDVoQ0NtSaQEW1MobfQX5Ch4xBqygvhpHSFUxS94ZK3whNZITi-SUP5R6E_0vrlSkQBdE85l-z588wfQjTvZ44mpE9vFkQIVdoMOYSw",
          caption: "Ortaköy Camii 1800' ler",
          credit: "google/<a href='https://lh3.googleusercontent.com/proxy/ehJLmf3k83E5uCMlTOoAsWZ3ZDGk0lTJEXqGDVoQ0NtSaQEW1MobfQX5Ch4xBqygvhpHSFUxS94ZK3whNZITi-SUP5R6E_0vrlSkQBdE85l-z588wfQjTvZ44mpE9vFkQIVdoMOYSw'>ortaköy</a>"
        },
        text: {
          headline: "İstanbul İklim Tarihi<br/> 1790 - 1835",
          text: "<p>İstanbul' un 1800' lü yılların ilk çeyrek iklim takvimi.</p>"
        }
      };

      let events: Events[] = [
        {
          media: {
            url: "https://twitter.com/bilalerdoga/status/937251729401401344",
            caption: "Twitterda bir yazı!",
            credit: "Bil:<a href='https://twitter.com/bilalerdoga/status/937251729401401344'>Bil Erd.o</a><br/><a href='https://twitter.com/bilalerdoga/status/937251729401401344'>Kar: Twitter</a>"
          },
          start_date: {
            year: '1300'
          },
          text: {
            headline: "book1",
            text: "<p>Book Text1</p>"
          }
        },
        {
          media: {
            url: "https://www.youtube.com/watch?v=Ug0t-xNq3qs",
            caption: "Aşkla işini yapanlarda bugün!",
            credit: "Cmylmz<a href='https://www.youtube.com/watch?v=Ug0t-xNq3qs'>Cem Yılmaz</a><br/><a href='https://www.youtube.com/watch?v=Ug0t-xNq3qs'>from: youtube</a>"
          },
          start_date: {
            month: "2",
            day: "1",
            year: "1300"
          },
          text: {
            headline: "book2",
            text: "<p>Book Text2</p>"
          }
        }
      ];

      let newJson: TimelineData = {
        title,
        events
      };

      this.climates.forEach((elem, i) => {
        newJson.events.push({
          start_date: {
            year: elem.date.split('-')[0],
            month: elem.date.split('-')[1],
            day: elem.date.split('-')[2]
          },
          text: {
            headline: elem.bookName,
            text: "<p>" + elem.text +"</p>"
          }
        })
      });

      new TL.Timeline('timeline-embed', newJson);
    });
  }

  public generateDateGraph() {

    let dateGraphData = [
      ['Yıl/Ay/Gün', this.climates.filter(climate => climate.dayExist && climate.monthExist && climate.yearExist).length],
      ['Yıl ve Ay', this.climates.filter(climate => !climate.dayExist && climate.monthExist && climate.yearExist).length],
      ['Sadece Yıl', this.climates.filter(climate => !climate.dayExist && !climate.monthExist && climate.yearExist).length],
      ['TOPLAM', this.climates.length]
    ];

    this.chartDateOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Tarih verilerine göre değerlendirme'
      },
      xAxis: {
        type: 'category',
        allowDecimals: false,
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Veri Sayısı'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        formatter: function () {
          return this.series.name + ': ' + this.y + '<br/>';
        }
      },
      series: [{
        name: 'Tarih',
        data: dateGraphData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
  }

  public generateBookNameGraph() {
    let graphData = [];

    for (let [key, value] of this.bookNameMap) {
      graphData.push({
        name: key + ' - (' + value + ')',
        y: (value / this.climates.length) * 100
      })
    }


    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Kitap ismine göre gruplama'
      },
      tooltip: {
        pointFormat: '{series.name}: {(this.climates.length * point.percentage) / 100} <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: graphData
      }]
    }
  }

  public ngOnDestroy(): void {
    this._endSubscriptions$.next(true);
    this._endSubscriptions$.complete();
  }
}
