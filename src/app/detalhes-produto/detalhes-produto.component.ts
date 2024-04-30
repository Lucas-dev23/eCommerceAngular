import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Importa Router diretamente
import { config } from '../../environments/environments';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: any;
  quantidade: number = 1; // Inicializa a quantidade como 1

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get(`${config.apiUrl}/produtos/obter/${id}`)
      .subscribe({
        next: (data: any) => {
          this.produto = data;
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }

  comprarProduto() {
    // Verifica se o produto e seu ID estão definidos
    if (this.produto && this.produto.id) {
        // Navega para a rota do carrinho de compras passando o ID do produto e a quantidade selecionada como parâmetros
        this.router.navigate(['/carrinho-de-compras', this.produto.id], { queryParams: { quantidade: this.quantidade } });
    } else {
        console.error('ID do produto não definido.');
    }
  }
}
