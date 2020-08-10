import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isMobileDevice: boolean;
  constructor() {}

  ngOnInit() {
    this.isMobileDevice = window.outerWidth < 780;
  }

  toggleDeviceType(){
    this.isMobileDevice = !this.isMobileDevice;
  }

  onMobileNavBarClick(){
    this.toggleDeviceType();
    console.log('onMobileNavBarClick');
    document.querySelectorAll('mobile_nav_items').forEach((ele) => {
      console.log(ele);
    });
  }
}
