import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorychatComponent } from './storychat.component';

describe('StorychatComponent', () => {
  let component: StorychatComponent;
  let fixture: ComponentFixture<StorychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
