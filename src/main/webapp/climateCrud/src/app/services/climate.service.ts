import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Climate} from "../app.component";
import {Observable} from "rxjs";

@Injectable()
export class ClimateService{
  private readonly baseURL: string;

  constructor(private http: HttpClient){
    this.baseURL ="api/";
  }

  getClimates(): Observable<Climate[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get<Climate[]>(this.baseURL + "climates", { headers: header});
  }

}
