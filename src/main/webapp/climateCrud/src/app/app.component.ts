import {Component, Directive, EventEmitter, Input, Output, PipeTransform, QueryList, ViewChildren} from '@angular/core';
import { ClimateService } from 'src/app/services/climate.service';
import {Observable} from "rxjs";
//              [(ngModel)]="searchText"
export interface Climate {
  id: number;
  author: string;
  bookName: string;
  date: Date;
  dayExist: Boolean;
  monthExist: Boolean;
  pageNumber: number;
  place: string;
  publishedBy: string;
  text: string;
  yearExist: Boolean;
}

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCRUDExample';

  climateList: Observable<Climate[]>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private climateService: ClimateService) {
    this.getClimates();
  }

  getClimates() {
    this.climateService.getClimates().subscribe(data => {
      Object.assign(this.climateList, data);
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }
}
