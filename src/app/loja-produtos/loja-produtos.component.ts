import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from '../../environments/environments';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-loja-produtos',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent
  ],
  templateUrl: './loja-produtos.component.html',
  styleUrl: './loja-produtos.component.css'
})
export class LojaProdutosComponent implements OnInit {

  produtos: any[] = [];
  filteredProdutos: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpClient.get<any[]>(`${config.apiUrl}/produtos/consultar`)
      .subscribe({
        next: (data) => { // Corrigido para aceitar um array de objetos
          this.produtos = data;
          this.filteredProdutos = this.produtos;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  filterProducts(searchTerm: string): void {
    this.filteredProdutos = this.produtos.filter((produto: any) => {
      return produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  onDetails(id: string): void {
    this.router.navigate(['/detalhes-produto', id]);
  }
}