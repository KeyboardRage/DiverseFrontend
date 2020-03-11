import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteModuleComponent } from './invite-module.component';

describe('InviteModuleComponent', () => {
  let component: InviteModuleComponent;
  let fixture: ComponentFixture<InviteModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
