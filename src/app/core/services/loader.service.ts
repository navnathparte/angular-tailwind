import { Injectable, signal } from '@angular/core';

export type LoaderType =
  | 'spinner'
  | 'bar'
  | 'dots'
  | 'skeleton'
  | 'fullscreen'
  | 'loading-logo'
  | 'orbe'
  | 'card';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  isLoading = signal(false);
  loaderType = signal<LoaderType>('spinner');

  show(type: LoaderType = 'spinner') {
    this.loaderType.set(type);
    this.isLoading.set(true);
  }

  hide() {
    this.isLoading.set(false);
  }
}
