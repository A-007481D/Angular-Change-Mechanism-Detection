# Angular Change Detection Demo: Default vs OnPush

A focused demonstration application visualizing the difference between Angular's **Default** (Dirty Checking) and **OnPush** change detection strategies.

This project is designed to prove how **Zone.js** triggers updates and how **OnPush** can optimize performance by ignoring unnecessary checks.

## The Experiment

The application consists of a Parent component and two distinct Children:
1.  🔴 **Child Default:** Uses the standard strategy. Checks itself on *every* application event.
2.  🟢 **Child OnPush:** Uses `ChangeDetectionStrategy.OnPush`. Only checks itself when input data changes.

### How to test it:

1.  **Open the Browser Console (F12)** to see the logs.
2.  **Click "Trigger Useless Event"**:
    * Creates a click event but changes no data.
    * **Result:** The 🔴 **Default** component logs a check. The 🟢 **OnPush** component remains silent (Performance Win).
3.  **Click "Update Data Inputs"**:
    * Increments a counter variable passed to inputs.
    * **Result:** Both components log a check because the Input reference changed.

## 🛠️ Technical Implementation

### The "Spy" Method
To visualize the invisible Change Detection process, we use a custom method in the HTML template:
```html
<p>Checks: {{ checkRender() }}</p>
```
- Note: This is an anti-pattern in production code, but perfect for educational visualization as it forces a log every time Angular scans the view.

## The Code Difference
### Default Component:
```html
@Component({
  selector: 'app-child-default',
  // No strategy defined = Default
})
```
#### OnPush Component:
```html
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child-on-push',
  changeDetection: ChangeDetectionStrategy.OnPush // 👈 The Optimization
})

```

### Key Concepts Covered
- **Zone.js**: The library that monkey-patches browser events to trigger Angular's change detection.

- **Dirty Checking**: The default behavior where Angular checks the entire component tree top-down.

- **OnPush Strategy**: A performance optimization that disables automatic checking for a component unless specific triggers occur (Input change, Async pipe, manual markForCheck).

- **Immutability**: The requirement to pass new object references to trigger OnPush updates.
