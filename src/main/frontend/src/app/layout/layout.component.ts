import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isMobileDevice: boolean;
  constructor() {}

  ngOnInit() {
    this.isMobileDevice = window.outerWidth < 780;
  }

  toggleDeviceType() {
    this.isMobileDevice = !this.isMobileDevice;
  }

  onMobileNavBarClick() {
    this.toggleDeviceType();
    console.log('onMobileNavBarClick');
    document.querySelectorAll('mobile_nav_items').forEach((ele) => {
      console.log(ele);
    });
  }
}
