import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSnippetModalComponent } from './edit-snippet-modal.component';

describe('CreateSnippetModalComponent', () => {
  let component: EditSnippetModalComponent;
  let fixture: ComponentFixture<EditSnippetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSnippetModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSnippetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
