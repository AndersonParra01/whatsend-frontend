import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMessagesComponent } from './historical-messages.component';

describe('HistoricalMessagesComponent', () => {
  let component: HistoricalMessagesComponent;
  let fixture: ComponentFixture<HistoricalMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
