import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  BASE_URL = '../assets/json/';
  data = new BehaviorSubject<any>([]);
  updatedData = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {
    this.getDeviceData();
  }

  get deviceData$() {
    return this.data.asObservable();
  }
  get updatedData$() {
    return this.updatedData.asObservable();
  }

  getDeviceData() {
    const httpResponse = pipe(
      tap((result) => {
        try {
          if (result) {
            this.data.next(result);
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    return httpResponse(this.http.get(this.BASE_URL + 'api.json')).subscribe();
  }

  latestData(data: any) {
    this.updatedData.next(data);
  }
}
