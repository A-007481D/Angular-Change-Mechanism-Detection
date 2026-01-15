import { Component } from '@angular/core';
import { ChildDefaultComponent } from './child-default/child-default.component';
import { ChildOnPushComponent } from './child-on-push/child-on-push.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildDefaultComponent, ChildOnPushComponent],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Parent Component</h1>

      <button (click)="uselessEvent()" style="padding: 10px; margin-right: 10px; cursor: pointer;">
        Trigger Useless Event (Click Me!)
      </button>

      <button (click)="updateData()" style="padding: 10px; cursor: pointer;">
        Update Data Inputs
      </button>

      <hr style="margin: 20px 0;">

      <div style="display: flex; gap: 20px;">
        <app-child-default [data]="counter"></app-child-default>

        <app-child-on-push [data]="counter"></app-child-on-push>
      </div>
    </div>
  `
})
export class AppComponent {
  counter = 0;

  uselessEvent() {
    console.log('--- Button Clicked (No Data Change) ---');
  }

  updateData() {
    console.log('--- Data Updated ---');
    this.counter++;
  }
}
