import {Component, OnDestroy} from '@angular/core';
import { ClimateService } from 'src/app/services/climate.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface Climate {
  id: number;
  author: string;
  bookName: string;
  date: string;
  dayExist: boolean;
  monthExist: boolean;
  pageNumber: number;
  place: string;
  publishedBy: string;
  text: string;
  yearExist: boolean;
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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  title = 'AngularCRUDExample';

  public _endSubscriptions$: Subject<boolean> = new Subject();

  columnsToDisplay = ['#', 'Text', 'Place', 'Date', 'PageNumber', 'BookName'];
  expandedElement: Climate | null;

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

  constructor(private climateService: ClimateService) {}

  public ngOnDestroy(): void {
    this._endSubscriptions$.next(true);
    this._endSubscriptions$.complete();
  }
}
