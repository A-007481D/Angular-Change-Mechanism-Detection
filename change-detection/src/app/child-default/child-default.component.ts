import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child-default',
  standalone: true,
  template: `
    <div style="border: 2px solid red; padding: 10px; margin: 10px;">
      <h3>🔴 Default Component</h3>
      <p>Data: {{ data }}</p>

      <p>Checks: {{ checkRender() }}</p>
    </div>
  `
})
export class ChildDefaultComponent {
  @Input() data: number = 0;

  // logging method
  checkRender() {
    console.log('🔴 Default Component Checked');
    return '';
  }
}
