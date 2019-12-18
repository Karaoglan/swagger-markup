import {Component, OnDestroy} from '@angular/core';
import { ClimateService } from 'src/app/services/climate.service';
import {Observable, Subject, combineLatest, of} from 'rxjs';
import {map, skip, takeUntil} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import * as _ from 'lodash';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";

export interface Climate {
  id?: number;
  author?: string;
  bookName: string;
  date: string;
  dayExist?: boolean;
  monthExist?: boolean;
  pageNumber: string;
  place: string;
  publishedBy?: string;
  text: string;
  yearExist?: boolean;
}

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  title = 'IKLIM PROJESI';

  public _endSubscriptions$: Subject<boolean> = new Subject();

  columnsToDisplay: string[] = ['#', 'Text', 'Place', 'Date', 'PageNumber', 'BookName', 'Yazar', 'YayınEvi', 'Yıl', 'Ay', 'Gün'];

  dataSource: MatTableDataSource<Climate>;

  searchText: string = '';


  /**
   * Observable of the account state.
   *
   * @type {Observable<AccountModel>}
   * @memberof AccountSystemHandler
   */
  public climates$: Observable<Climate[]> = this.climateService.getClimates()
    .pipe(
      takeUntil(this._endSubscriptions$)
  );

  yearCheck: boolean = undefined;
  monthCheck: boolean = undefined;
  dayCheck: boolean = undefined;

  public yearFilter$: Observable<Climate[]> = this.climates$;
  public monthFilter$: Observable<Climate[]> = this.climates$;
  public dayFilter$: Observable<Climate[]> = this.climates$;

  constructor(private climateService: ClimateService) {
    this.climates$.subscribe(data => { this.dataSource = new MatTableDataSource<Climate>(data) });
  }

  public ngOnDestroy(): void {
    this._endSubscriptions$.next(true);
    this._endSubscriptions$.complete();
  }

  dateClicked($event: MatCheckboxChange) {

    if (this.yearCheck !== undefined) {
      this.yearFilter$ = this.climates$.pipe(map(item => item.filter(climate => climate.yearExist === this.yearCheck)));
    }

    if (this.monthCheck !== undefined) {
      this.monthFilter$ = this.climates$.pipe(map(item => item.filter(climate => climate.monthExist === this.monthCheck)));
    }

    if (this.dayCheck !== undefined) {
      this.dayFilter$ = this.climates$.pipe(map(item => item.filter(climate => climate.dayExist === this.dayCheck)));
    }

    combineLatest(this.yearFilter$, this.monthFilter$, this.dayFilter$, (year, month, day) => {
      debugger
      return _.intersectionWith(year, month, day, _.isEqual)
    }).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  filterOff() {
    this.climates$.subscribe(data => {
      this.dataSource.data = data;
      this.yearCheck = undefined;
      this.dayCheck = undefined;
      this.monthCheck = undefined;

      this.yearFilter$ = this.climates$;
      this.monthFilter$ = this.climates$;
      this.dayFilter$ = this.climates$;

      this.searchText = '';
      this.applyFilter(this.searchText);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}