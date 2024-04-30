import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaProdutosComponent } from './loja-produtos.component';

describe('LojaProdutosComponent', () => {
  let component: LojaProdutosComponent;
  let fixture: ComponentFixture<LojaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LojaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
