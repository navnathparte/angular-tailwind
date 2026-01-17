import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true, // 🔥 VERY IMPORTANT
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  router = inject(Router);
  route = inject(ActivatedRoute);

  breadcrumbs: string[] = [];

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumb(this.route.root);
    });
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', crumbs: string[] = []): string[] {
    const children = route.children;

    if (children.length === 0) return crumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
        crumbs.push(routeURL);
      }
      return this.buildBreadcrumb(child, url, crumbs);
    }

    return crumbs;
  }
}
