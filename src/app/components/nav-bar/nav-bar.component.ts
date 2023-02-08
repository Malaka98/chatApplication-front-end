import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  cartDetail!: Observable<any>

  constructor(private _router: Router, private _notification: NzNotificationService) {
  }

  ngOnInit(): void {
  }

  navigateHandler() {
    this._router.navigate(["dashboard"]).then()
  }
}
