import { Component, Input, SimpleChanges } from '@angular/core';
import { DevicesService } from 'src/app/Services/devices.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() deviceData: any[] | undefined;
  updatedCheckBoxes: any = [];
  tableHeadings: string[] = [];
  constructor(private service: DevicesService) {}
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes?.hasOwnProperty(propName)) {
        const change = changes[propName];
        switch (propName) {
          case 'deviceData': {
            if (change.currentValue && change.currentValue?.length > 0) {
              this.tableHeadings = Object.keys(change.currentValue[0]).map(
                (data) => data.charAt(0).toUpperCase() + data.slice(1)
              );
            }
          }
        }
      }
    }
  }

  deviceCheckbox(e: any) {
    let checkedDevice: any = e.target.checked;
    let deviceId: any = e.target.id;
    if (checkedDevice) {
      e.target.parentElement.parentElement.style.background = '#f3ebeb';
    } else {
      e.target.parentElement.parentElement.removeAttribute('style');
    }
    const index = this.updatedCheckBoxes.findIndex(
      (data: any) => data.id === deviceId
    );
    if (index > -1) {
      this.updatedCheckBoxes[index] = { checked: checkedDevice, id: deviceId };
    } else {
      this.updatedCheckBoxes.push({ checked: checkedDevice, id: deviceId });
    }
    this.deviceData?.forEach((data) => {
      let index = this.updatedCheckBoxes.findIndex(
        (result: any) => result.id === data.name
      );
      if (index > -1) {
        data['checked'] = this.updatedCheckBoxes[index].checked;
      }
    });
    this.service.latestData(this.deviceData);
    this.updatedCheckBoxes = [];
  }
}
