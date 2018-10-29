import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-ui-loading',
  templateUrl: './ui-loading.component.html',
  styleUrls: ['./ui-loading.component.scss']
})
export class UiLoadingComponent {

  private _loading: Subject<boolean> = new Subject<boolean>();
  isLoading = this._loading.asObservable();

  setLoading(isLoading: boolean) {
      this._loading.next(isLoading);
  }
  constructor() { }
}
