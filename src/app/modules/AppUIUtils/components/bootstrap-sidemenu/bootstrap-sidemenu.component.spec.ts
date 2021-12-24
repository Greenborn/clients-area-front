import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapSidemenuComponent } from './bootstrap-sidemenu.component';

describe('BootstrapSidemenuComponent', () => {
  let component: BootstrapSidemenuComponent;
  let fixture: ComponentFixture<BootstrapSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
