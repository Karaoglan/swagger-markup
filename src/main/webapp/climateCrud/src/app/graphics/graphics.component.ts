import {Component, OnDestroy, OnInit} from '@angular/core';
import { ClimateService } from 'src/app/services/climate.service';
import * as Highcharts from 'highcharts';
import {from, Observable, Subject} from "rxjs";
import {Climate} from "../climates/climates.component";
import {groupBy, map, mergeMap, takeUntil, toArray} from "rxjs/operators";

/*
author: "Federico Gravina"
bookName: "İstanbul’ un Anlatımı"
date: "1788-05-08"
dayExist: true
id: 1
monthExist: true
pageNumber: "26"
place: "İstanbul"
publishedBy: "YKY"
publishedDate: "2008"
text: "... ‘Veba hastalığının aşırı salgın halde değilse de başkentte sürdüğünü ... ‘"
yearExist: true

 */

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
})
export class GraphicsComponent implements OnInit, OnDestroy {
  title = 'IKLIM PROJESI';

  public _endSubscriptions$: Subject<boolean> = new Subject();

  Highcharts = Highcharts;

  chartOptions: {};

  bookNameMap = new Map();

  climates: Climate[] = [
    {
      "id": 1,
      "date": "1788-05-08",
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
      "text": "8 Haziran’ da hareketi olanasızlaştıracak derecee güney rüzgarı etili oldu. ",
      "place": "İstanbul/Galata",
      "pageNumber": "36",
      "bookName": "book2",
      "author": "Federico Gravina",
      "publishedBy": "YKY",
      "yearExist": true,
      "monthExist": true,
      "dayExist": false
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
    /*this.climates$.pipe(
      //map(climate => console.log(climate))
      groupBy(climate => climate.bookName),
      mergeMap(group => group.pipe(toArray()))
    ).subscribe((data) => console.log(data));*/


    from(this.climates).pipe(
      groupBy(climate => climate.bookName),
      mergeMap(group => group.pipe(toArray()))
    ).subscribe((data) => console.log(data));

  }

  // data: [{
  //           name: 'Chrome',
  //           y: 61.41,
  //           sliced: true,
  //           selected: true
  //         }, {
  //           name: 'Internet Explorer',
  //           y: 11.84
  //         }, {
  //           name: 'Firefox',
  //           y: 10.85
  //         }, {
  //           name: 'Edge',
  //           y: 4.67
  //         }, {
  //           name: 'Safari',
  //           y: 4.18
  //         }, {
  //           name: 'Other',
  //           y: 7.05
  //         }]

  ngOnInit() {

    let graphData = [];


    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Other',
          y: 7.05
        }]
      }]
    }
  }

  public ngOnDestroy(): void {
    this._endSubscriptions$.next(true);
    this._endSubscriptions$.complete();
  }
}
