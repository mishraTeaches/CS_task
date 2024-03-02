import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { DevicesService } from 'src/app/Services/devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent {
  deviceData$: Observable<any> | undefined;
  deviceDataSubs: Subscription | undefined;
  constructor(
    private deviceService: DevicesService,
    private changeDetection: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.deviceData$ = this.deviceService.deviceData$;
    this.deviceDataSubs = this.deviceService.updatedData$.subscribe(
      (result) => {
        if (result?.length > 0) {
          this.deviceData$ = of(result);
          this.changeDetection.reattach();
          this.changeDetection.markForCheck();
        }
      }
    );
  }
  ngOnDestroy() {
    this.deviceDataSubs?.unsubscribe();
  }
}
