import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-logo',
  imports: [],
  templateUrl: './loading-logo.html',
  styleUrl: './loading-logo.css',
})
export class LoadingLogo {
  circles = [
    { delay: '0s' },
    { delay: '0.2s' },
    { delay: '0.3s' },
    { delay: '0.4s' },
    { delay: '0.5s' },
    { delay: '0.6s' },
  ];
}
