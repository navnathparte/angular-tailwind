import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { CommonModule } from '@angular/common';
import { Loader } from './shared/loader/loader';
import { Toaster } from './shared/toaster/toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Loader, Toaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-tailwind-app');

  constructor(public loaderService: LoaderService) {}
}
