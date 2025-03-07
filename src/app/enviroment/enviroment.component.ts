import { Component } from '@angular/core';
import { NavigationError, Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroment.component.html',
  styleUrls: ['./enviroment.component.css']
})
export class EnviromentComponent {
  public style: object = {};

  component = ''

  constructor(private router: Router) {
    this.component = router.url.split('/')[1]
    router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        console.log(event.url)
      }
    });
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
  }
}

