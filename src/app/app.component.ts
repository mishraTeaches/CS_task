import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DevicesService } from './Services/devices.service';
import { toggleSelectAllDevices } from './Utils/toggle-checkbox';
import { Subscription, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'crowd-strike';
  updatedDeviceData = [];
  deviceData = [];
  selected: any = 0;
  deviceDataSubs: Subscription | undefined;
  allDevice: any = '';
  tableRows: any = '';
  updatedDataSubs: Subscription | undefined;
  updatedData = [];
  constructor(
    private service: DevicesService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.deviceDataSubs = this.service.deviceData$.subscribe((result) => {
      if (result) {
        this.deviceData = result;
      }
    });
    this.updatedDataSubs = this.service.updatedData$.subscribe((data) => {
      if (data) {
        this.updatedData = data.filter((res: any) => res.checked);
        this.selected = this.updatedData?.length;
        this.allDevice = this.document.querySelector('#allDevices');
        this.tableRows = this.document.querySelectorAll('tr:nth-child(n+2)');
        if (this.selected > 0 && this.selected < 5) {
          this.allDevice.indeterminate = true;
        } else if (this.selected === 5) {
          this.allDevice.indeterminate = false;
          this.allDevice.checked = true;
          this.tableRows.forEach((row: any) => {
            row.style.background = '#f3ebeb';
          });
        } else {
          this.tableRows.forEach((row: any) => {
            row.removeAttribute('style');
          });
        }
      }
    });
  }
  allDevices(e: any) {
    if (this.deviceData) {
      this.updatedDeviceData = toggleSelectAllDevices(e, this.deviceData);
      this.service.latestData(this.updatedDeviceData);
    }
  }
  download() {
    const data = this.updatedData
      .filter((data: any) => data.checked)
      .filter((data: any) => data.status === 'available');
    if (data?.length > 0) {
      alert(JSON.stringify(data));
    }
  }
  ngOnDestroy() {
    this.deviceDataSubs?.unsubscribe();
    this.updatedDataSubs?.unsubscribe();
  }
}
