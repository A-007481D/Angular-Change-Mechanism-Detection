# 📘 Angular Demo: Pipes & Async (Promise vs Observable)

## 🎯 Project Goal
To demonstrate how Angular Pipes transform data and how the Async Pipe handles Observables automatically. This project simulates a slow server request to show how Angular handles asynchronous streams without freezing the UI.

---

## 🛠️ Step 1: Project Setup (Recreation Steps)
If you need to rebuild this from scratch, here are the terminal commands:

```bash
# 1. Create the project
ng new demo-pipes-async --style=css --routing=false

# 2. Enter the folder
cd demo-pipes-async

# 3. Generate the component
ng generate component profile
```

---

## 📂 Step 2: The Code (Copy & Paste)

### 1. The Logic: `src/app/profile/profile.component.ts`

**What changed?**
*   We imported `Observable`, `of`, and `delay` from `rxjs`.
*   We imported `CommonModule` to enable pipes like `| async` and `| date`.
*   We created a stream `userStream$` that waits 3 seconds before emitting data.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define the shape of our data
interface User {
  username: string;
  email: string;
  balance: number;      // Added for testing CurrencyPipe
  rating: number;       // Added for testing DecimalPipe
  joinDate: Date;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule], // CRITICAL: Enables pipes!
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  // The '$' is a naming convention for Observables
  userStream$: Observable<User>;

  constructor() {
    // Simulate a backend call
    this.userStream$ = of({
      username: 'malik_dev',
      email: 'malik@youcode.ma',
      balance: 1500.50,
      rating: 0.8543,
      joinDate: new Date()
    }).pipe(
      delay(3000) // Waits 3 seconds (simulating slow network)
    );
  }
}
```

### 2. The View: `src/app/profile/profile.component.html`

**What changed?**
*   Used `*ngIf` with `async` to subscribe/unsubscribe automatically.
*   Used `else loadingTemplate` to handle the waiting state.
*   Chained pipes (`|`) to format data.

```html
<div style="text-align: center; margin-top: 50px; font-family: sans-serif;">

  <h1>Demo: Async Pipe & Pipes</h1>

  <div *ngIf="userStream$ | async as user; else loadingTemplate">

    <div style="border: 1px solid #ccc; padding: 20px; display: inline-block; border-radius: 8px; min-width: 300px;">
      
      <h2>{{ user.username | uppercase }}</h2>
      
      <p>Email: {{ user.email }}</p>
      
      <p>Joined: {{ user.joinDate | date:'medium' }}</p>

      <hr>
      
      <p><strong>Wallet:</strong> {{ user.balance | currency:'EUR' }}</p>
      
      <p><strong>Rating:</strong> {{ user.rating | percent }}</p>
      
      <p><strong>Raw Data (Debug):</strong></p>
      <pre style="text-align: left; background: #f4f4f4; padding: 10px;">{{ user | json }}</pre>

    </div>
  </div>

  <ng-template #loadingTemplate>
    <h3>⏳ Loading Profile... (Wait 3s)</h3>
  </ng-template>

</div>
```

### 3. The Registration: `src/app/app.component.ts`

**What changed?**
*   We imported `ProfileComponent` and added it to the `imports` array. This fixes the "Unknown element" error.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-pipes-async';
}
```

### 4. The Container: `src/app/app.component.html`

**What changed?**
*   Removed default Angular boilerplate.
*   Added the selector for our new component.

```html
<app-profile></app-profile>
```

---

## 🧪 Offline Playground: How to Experiment
Since you won't have internet, use this guide to try different pipes in your HTML.

### Challenge 1: Currency Pipe
Change the currency to US Dollars or Moroccan Dirham.

*   Code: `{{ user.balance | currency:'USD' }}`
*   Code: `{{ user.balance | currency:'MAD':'code' }}`

### Challenge 2: Date Formats
Try these different date strings to see how they change:

*   `{{ user.joinDate | date:'short' }}` -> M/d/yy, h:mm a
*   `{{ user.joinDate | date:'medium' }}` -> MMM d, y, h:mm:ss a
*   `{{ user.joinDate | date:'fullDate' }}` -> Monday, January 15, 2026
*   `{{ user.joinDate | date:'dd/MM/yyyy' }}` -> 15/01/2026 (French format)

### Challenge 3: Slice Pipe (for Arrays or Strings)
This cuts a string or list. Try modifying the username.

*   Code: `{{ user.username | slice:0:3 }}`
*   Result: `"mal"` (Takes characters from index 0 to 3)

### Challenge 4: The Debug Pipe (JSON)
If you ever don't know what your data looks like, use this. It dumps the raw object.

*   Code: `<pre>{{ user | json }}</pre>`

---

## 🧠 Key Concepts Recap (For your Presentation)

### Observable (The Stream)
*   It is "Lazy". It creates the data inside `profile.component.ts` but doesn't send it until someone subscribes.
*   In our code: `userStream$` is the Observable.

### Async Pipe (The Subscriber)
*   It lives in the HTML.
*   It automatically calls `.subscribe()` when the component loads.
*   It automatically calls `.unsubscribe()` when the component is destroyed.
*   **Why use it?** To prevent memory leaks and reduce TypeScript code.

### Pure Pipes
*   `DatePipe`, `UpperCasePipe`, `CurrencyPipe`.
*   They only run when the value changes (Fast).

### Impure Pipes
*   `AsyncPipe`.
*   It checks for updates constantly because streams are dynamic.# Angular-Change-Mechanism-Detection
