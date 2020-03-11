import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildFeaturesComponent } from './guild-features.component';

describe('GuildFeaturesComponent', () => {
  let component: GuildFeaturesComponent;
  let fixture: ComponentFixture<GuildFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
