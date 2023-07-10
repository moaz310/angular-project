import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggelOpen(){
    this.isOpen = !this.isOpen;
  };  

  constructor(private elmRef: ElementRef) { }

}
