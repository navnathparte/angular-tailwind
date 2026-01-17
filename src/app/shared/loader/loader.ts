import { Component, effect } from '@angular/core';
import { LoaderService, LoaderType } from '../../core/services/loader.service';
import { SkeletonLoader } from './loaders/skeleton-loader/skeleton-loader';
import { FullscreenLoader } from './loaders/fullscreen-loader/fullscreen-loader';
import { LoadingLogo } from './loaders/loading-logo/loading-logo';
import { Orbe } from './loaders/orbe/orbe';
import { Card } from './loaders/card/card';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [SkeletonLoader, FullscreenLoader, LoadingLogo, Orbe, Card],
  templateUrl: './loader.html',
})
export class Loader {
  type: LoaderType = 'spinner';

  constructor(private loader: LoaderService) {
    effect(() => {
      this.type = this.loader.loaderType();
    });
  }
}
