import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

export interface Month {
  lived: boolean
}

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss'
})
export class MonthComponent {

  @Input() month: Month = {
    lived: false
  };
}
