import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { config } from '../../environments/environments';
import { CommonModule } from '@angular/common';
import { Produto } from '../interfaces.ts/Produto';
import { ItemCarrinho } from '../interfaces.ts/ItemCarrinho';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent implements OnInit {

  carrinho = {
    valorTotal: 0,
    quantidadeItens: 0,
    itens: [] as ItemCarrinho[]
  };

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Carrega o carrinho salvo na inicialização do componente
    this.carregarCarrinhoSalvo();

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // Verifica se o ID é válido antes de fazer a solicitação HTTP
    if (id) {
      let quantidade = parseInt(this.activatedRoute.snapshot.queryParamMap.get('quantidade') || '1');
      quantidade = Math.min(Math.max(quantidade, 1), 100); // Garante que a quantidade esteja entre 1 e 100

      this.httpClient.get(`${config.apiUrl}/produtos/obter/${id}`).subscribe({
        next: (produto: any) => this.adicionarProdutoAoCarrinho({
          idProduto: produto.id,
          nomeProduto: produto.nome,
          precoProduto: produto.preco,
          quantidadeProduto: quantidade,
          foto: produto.foto
        }),
        error: (error) => {
          console.error('Erro ao obter detalhes do produto:', error);
          // Lógica para lidar com o erro ao obter os detalhes do produto
        }
      });
    }
  }

  adicionarProdutoAoCarrinho(produto: Produto) {
    const itemExistenteIndex = this.carrinho.itens.findIndex(item => item.idProduto === produto.idProduto);

    const quantidadeDaUrl = parseInt(this.activatedRoute.snapshot.queryParamMap.get('quantidade') || '1');
    const quantidade = Math.min(quantidadeDaUrl, 100); // Garante que a quantidade esteja entre 1 e 100

    if (itemExistenteIndex !== -1) {
      const itemExistente = this.carrinho.itens[itemExistenteIndex];
      const quantidadeTotal = itemExistente.quantidadeProduto + quantidade;
      if (quantidadeTotal > 100) {
        alert('A quantidade máxima por item é de 100 unidades.');
        return;
      }
      itemExistente.quantidadeProduto = quantidadeTotal;
      itemExistente.totalProduto = itemExistente.precoProduto * quantidadeTotal;
    } else {
      if (quantidade > 100) {
        alert('A quantidade máxima por item é de 100 unidades.');
        return;
      }
      this.carrinho.itens.push({
        ...produto,
        quantidadeProduto: quantidade,
        totalProduto: produto.precoProduto * quantidade
      });
    }

    this.atualizarTotalCarrinho();
    this.salvarCarrinhoNaLocalStorage();
  }

  adicionarMaisUmAoCarrinho(item: ItemCarrinho) {
    if (item.quantidadeProduto + 1 > 100) {
      alert('A quantidade máxima por item é de 100 unidades.');
      return;
    }
    item.quantidadeProduto++;
    item.totalProduto = item.precoProduto * item.quantidadeProduto;
    this.atualizarTotalCarrinho();
    this.salvarCarrinhoNaLocalStorage();
  }

  removerUmProdutoDoCarrinho(idProduto: string) {
    const index = this.carrinho.itens.findIndex(item => item.idProduto === idProduto);
    if (index !== -1) {
      const item = this.carrinho.itens[index];
      if (item.quantidadeProduto > 1) {
        item.quantidadeProduto--;
        item.totalProduto = item.precoProduto * item.quantidadeProduto;
      } else {
        this.carrinho.itens.splice(index, 1);
      }
      this.atualizarTotalCarrinho();
      this.salvarCarrinhoNaLocalStorage();
    }
  }

  limparCarrinho() {
    if (confirm('Tem certeza de que deseja limpar o carrinho?')) {
      this.carrinho.itens = [];
      this.atualizarTotalCarrinho();
      this.salvarCarrinhoNaLocalStorage();
    }
  }

  // Atualiza o total do carrinho
  private atualizarTotalCarrinho() {
    this.carrinho.valorTotal = this.carrinho.itens.reduce((total, item) => total + item.totalProduto, 0);
    this.carrinho.quantidadeItens = this.carrinho.itens.reduce((total, item) => total + item.quantidadeProduto, 0);
  }

  // Salva o carrinho na Local Storage
  private salvarCarrinhoNaLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  // Carrega o carrinho salvo na Local Storage
  private carregarCarrinhoSalvo() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
      this.atualizarTotalCarrinho();
    }
  }
}