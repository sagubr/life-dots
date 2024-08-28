import {Component, OnInit} from '@angular/core';
import {Month, MonthComponent} from "./month/month.component";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";

import {provideNativeDateAdapter} from "@angular/material/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-life',
  standalone: true,
  imports: [
    CommonModule,
    MonthComponent,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
    FormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    provideNgxMask()
  ],
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit {

  year: number = 0;
  life: Month[] = [];
  dateOfBirth: Date = new Date();

  ngOnInit() {
    this.updateLife();
  }

  onDateChange(event: any) {
    this.dateOfBirth = event.value;
    this.updateLife();
  }

  updateLife() {
    if (this.dateOfBirth && this.year) {
      const now = new Date();
      const monthsLived = this.calculateMonthsLived(this.dateOfBirth, now);
      this.life = Array.from({length: this.year * 12}, (_, i) => ({
        lived: i < monthsLived
      }));
    }
  }

  calculateMonthsLived(dateOfBirth: Date, currentDate: Date): number {
    if (dateOfBirth > currentDate) {
      return 0;
    }

    const years = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const months = currentDate.getMonth() - dateOfBirth.getMonth();
    const days = currentDate.getDate() - dateOfBirth.getDate();

    let totalMonths = years * 12 + months;
    if (days < 0) {
      totalMonths -= 1;
    }

    return Math.max(totalMonths, 0);
  }
}
