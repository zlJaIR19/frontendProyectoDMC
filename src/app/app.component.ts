import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav></app-nav>
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'E-Commerce App';
}
