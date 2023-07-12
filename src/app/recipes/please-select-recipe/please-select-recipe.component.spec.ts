import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseSelectRecipeComponent } from './please-select-recipe.component';

describe('PleaseSelectRecipeComponent', () => {
  let component: PleaseSelectRecipeComponent;
  let fixture: ComponentFixture<PleaseSelectRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseSelectRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleaseSelectRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
