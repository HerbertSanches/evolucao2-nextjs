














class produtoEstoque{

RECURSO: string;
FPeId: number;
FPeIdempresa: number;
FPeIdproduto: number;
FPeIdLocalEstoque: number;
FPeQnt: number; // Representado como Currency, mas no TypeScript será number
FPeQntMinima: number;
FPeQntMaxima: number;
FPeHistdtcadastro: string;
FPeHistuscadastro: number;
FPeHistdtalteracao: string;
FPeHistusalteracao: number;
FPeHistdtdeletado: string;
FPeHistusdeletado: number;
FPeDeletado: number;
FPedescricao: string;

constructor({produtoestoque, pe_id, pe_idempresa, pe_idproduto, pe_idlocalestoque, pe_qnt, pe_qntminima, pe_qntmaxima, pe_histdtcadastro, pe_histuscadastro, pe_histdtalteracao, pe_histusalteracao, pe_histdtdeletado, pe_histusdeletado, pe_deletado, pe_descricao}:
{produtoestoque: string; pe_id: number; pe_idempresa: number; pe_idproduto: number; pe_idlocalestoque: number; pe_qnt: })
{
    this.RECURSO = produtoestoque;
    this.FPeId = pe_id;
    this.FPeIdempresa = pe_idempresa;
    this.FPeIdproduto = pe_idproduto;
    this.FPeIdLocalEstoque = pe_idlocalestoque;
    this.

}

}