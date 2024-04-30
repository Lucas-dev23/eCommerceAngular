import { Routes } from '@angular/router';
import { LojaProdutosComponent } from './loja-produtos/loja-produtos.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { CarrinhoDeComprasComponent } from './carrinho-de-compras/carrinho-de-compras.component';

export const routes: Routes = [
    {
        path: 'loja-produtos',
        component: LojaProdutosComponent
    },
    // Rota padrão que redireciona para 'loja-produtos'
    {
        path: '',
        redirectTo: 'loja-produtos',
        pathMatch: 'full'
    },
    {
        path: 'detalhes-produto/:id',
        component: DetalhesProdutoComponent
    },
    {
        path: 'carrinho-de-compras/:id',
        component: CarrinhoDeComprasComponent
    },
    {
        path: 'carrinho-de-compras',
        component: CarrinhoDeComprasComponent
    }
];
