import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child-on-push',
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="border: 2px solid green; padding: 10px; margin: 10px;">
      <h3>🟢 OnPush Component</h3>
      <p>Data: {{ data }}</p>

      <p>Checks: {{ checkRender() }}</p>
    </div>
  `
})
export class ChildOnPushComponent {
  @Input() data: number = 0;

  checkRender() {
    console.log('🟢 OnPush Component Checked');
    return '';
  }
}
