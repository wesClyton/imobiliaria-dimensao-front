import { Component } from '@angular/core';

@Component({
  selector: 'app-page-erro',
  templateUrl: './page-erro.component.html',
  styleUrls: ['./page-erro.component.scss']
})
export class PageErroComponent {

  constructor() { }

  public back(): void {
    window.history.back();
  }

}
