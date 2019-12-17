import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Climate} from "../app.component";
import {Observable, of} from "rxjs";
import {take} from "rxjs/operators";

@Injectable()
export class ClimateService{
  private readonly baseURL: string;

  constructor(private http: HttpClient){
    this.baseURL ="api/";
  }

  getClimates(): Observable<Climate[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    //return this.http.get<Climate[]>(this.baseURL + "climates", { headers: header}).pipe(take(1));

    return of([
      {
        "id": 1,
        "date": "1788-05-08",
        "text": "... ‘Veba hastalığının aşırı salgın halde değilse de başkentte sürdüğünü ‘",
        "place": "İstanbul",
        "pageNumber": "26",
        "bookName": "İstanbul’ un Anlatımı",
        "author": "Federico Gravina",
        "publishedBy": "YKY",
        "publishedDate": "2008",
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
        "bookName": "İstanbul’ un Anlatımı",
        "author": "Federico Gravina",
        "publishedBy": "YKY",
        "publishedDate": "2010",
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
        "bookName": "İstanbul’ un Anlatımı",
        "author": "Federico Gravina",
        "publishedBy": "YKY",
        "publishedDate": "2009",
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
        "bookName": "İstanbul’ un Anlatımı",
        "author": "Federico Gravina",
        "publishedBy": "YKY",
        "publishedDate": "2010",
        "yearExist": true,
        "monthExist": true,
        "dayExist": false
      }
    ])
  }


  getClimatesWithSameDateMap(): Observable<Climate[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get<Climate[]>(this.baseURL + "climatesSameDate", { headers: header}).pipe(take(1));
  }


}
