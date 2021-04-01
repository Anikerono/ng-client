import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordresetformComponent } from './passwordresetform.component';

describe('PasswordresetformComponent', () => {
  let component: PasswordresetformComponent;
  let fixture: ComponentFixture<PasswordresetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordresetformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordresetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
