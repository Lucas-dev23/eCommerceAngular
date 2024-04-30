import { Produto } from "./Produto";

export interface ItemCarrinho extends Produto {
    totalProduto: number;
}