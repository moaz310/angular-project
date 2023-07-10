import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() loadComponent = new EventEmitter<string>();

  onSelect(component: string) {
    this.loadComponent.emit(component);
  }
}
