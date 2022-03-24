import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-erro',
  templateUrl: './page-erro.component.html',
  styleUrls: ['./page-erro.component.scss']
})
export class PageErroComponent {

  constructor(
    private readonly location: Location
  ) { }

  public back(): void {
    this.location.back();
  }

}
