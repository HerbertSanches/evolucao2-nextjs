















class produtoEstoque {

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
                {produtoestoque: string; pe_id: number; pe_idempresa: number; pe_idproduto: number; pe_idlocalestoque: number; pe_qnt: number; pe_qntminima: number; pe_qntmaxima: number; pe_histdtcadastro: string; pe_histuscadastro: number; pe_histdtalteracao: string; pe_histusalteracao: number; pe_histdtdeletado: string; pe_histusdeletado: number; pe_deletado: number; pe_descricao: string;}) 
    {
        this.RECURSO = produtoestoque;
        this.FPeId = pe_id;
        this.FPeIdempresa = pe_idempresa;
        this.FPeIdproduto = pe_idproduto;
        this.FPeIdLocalEstoque = pe_idlocalestoque;
        this.FPeQnt = pe_qnt;
        this.FPeQntMinima = pe_qntminima;
        this.FPeQntMaxima = pe_qntmaxima;
        this.FPeHistdtcadastro = pe_histdtcadastro;
        this.FPeHistuscadastro = pe_histuscadastro;
        this.FPeHistdtalteracao = pe_histdtalteracao;
        this.FPeHistusalteracao = pe_histusalteracao;
        this.FPeHistdtdeletado = pe_histdtdeletado;
        this.FPeHistusdeletado = pe_histusdeletado;
        this.FPeDeletado = pe_deletado;
        this.FPedescricao = pe_descricao;
    }
}

const TProdutoEstoque = ({

    RECURSO: 'produtoestoque',
    FIELD1: 'pe_id',
    FIELD2: 'pe_idempresa',
    FIELD3: 'pe_idproduto',
    FIELD4: 'pe_idlocalestoque',
    FIELD5: 'pe_qnt',
    FIELD6: 'pe_qntminima',
    FIELD7: 'pe_qntmaxima',
    FIELD8: 'pe_histdtcadastro',
    FIELD9: 'pe_histuscadastro',
    FIELD10:  'pe_histdtalteracao',
    FIELD11: 'pe_histusalteracao',
    FIELD12: 'pe_histdtdeletado',
    FIELD13: 'pe_histusdeletado',
    FIELD14: 'pe_deletado',
    FIELD100: 'pe_descricao',

})



class produtoPreco {

    RECURSO: string;
    FPpId: number;
    FPpIdempresa: number;
    FPpIdproduto: number;
    FPpIndice: number;
    FPpValor: number; // Representado como Currency, mas no TypeScript será number
    FPpHistdtcadastro: string;
    FPpHistuscadastro: number;
    FPpHistdtalteracao: string;
    FPpHistusalteracao: number;
    FPpHistdtdeletado: string;
    FPpHistusdeletado: number;
    FPpDeletado: number;
    
    constructor({preco, pp_id, pp_idempresa, pp_idproduto, pp_indice, pp_valor, pp_histdtcadastro, pp_histuscadastro, pp_histdtalteracao, pp_histusalteracao, pp_histdtdeletado, pp_histusdeletado, pp_deletado}: 
                {preco: string; pp_id: number; pp_idempresa: number; pp_idproduto: number; pp_indice: number; pp_valor: number; pp_histdtcadastro: string; pp_histuscadastro: number; pp_histdtalteracao: string; pp_histusalteracao: number; pp_histdtdeletado: string; pp_histusdeletado: number; pp_deletado: number;}) 
    {
        this.RECURSO = preco;
        this.FPpId = pp_id;
        this.FPpIdempresa = pp_idempresa;
        this.FPpIdproduto = pp_idproduto;
        this.FPpIndice = pp_indice;
        this.FPpValor = pp_valor;
        this.FPpHistdtcadastro = pp_histdtcadastro;
        this.FPpHistuscadastro = pp_histuscadastro;
        this.FPpHistdtalteracao = pp_histdtalteracao;
        this.FPpHistusalteracao = pp_histusalteracao;
        this.FPpHistdtdeletado = pp_histdtdeletado;
        this.FPpHistusdeletado = pp_histusdeletado;
        this.FPpDeletado = pp_deletado;
    }
}

const TProdutoPreco = ({

    RECURSO: 'preco',
    FIELD1: 'pp_id',
    FIELD2: 'pp_idempresa',
    FIELD3: 'pp_idproduto',
    FIELD4: 'pp_indice',
    FIELD5: 'pp_valor',
    FIELD6: 'pp_histdtcadastro',
    FIELD7: 'pp_histuscadastro',
    FIELD8: 'pp_histdtalteracao',
    FIELD9: 'pp_histusalteracao',
    FIELD10: 'pp_histdtdeletado',
    FIELD11: 'pp_histusdeletado',
    FIELD12: 'pp_deletado'

})


class produtoLote {
    
    RECURSO: string;
    FPlId: number;
    FPlIdempresa: number;
    FPlIdproduto: number;
    FPlLote: string;
    FPlDtValidade: string;
    FPlDtFabricacao: string;
    FPlHistdtcadastro: string;
    FPlHistuscadastro: number;
    FPlHistdtalteracao: string;
    FPlHistusalteracao: number;
    FPlHistdtdeletado: string;
    FPlHistusdeletado: number;
    FPlDeletado: number;
    FPlQntCompra: number; // Representado como Currency, mas no TypeScript será number
    FPlQuantidade: number; // Representado como Currency, mas no TypeScript será number

    constructor({produtolote, pl_id, pl_idempresa, pl_idproduto, pl_lote, pl_dtvalidade, pl_dtfabricacao, pl_histdtcadastro, pl_histuscadastro, pl_histdtalteracao, pl_histusalteracao, pl_histdtdeletado, pl_histusdeletado, pl_deletado, pl_qntcompra, pl_quantidade}: 
                {produtolote: string; pl_id: number; pl_idempresa: number; pl_idproduto: number; pl_lote: string; pl_dtvalidade: string; pl_dtfabricacao: string; pl_histdtcadastro: string; pl_histuscadastro: number; pl_histdtalteracao: string; pl_histusalteracao: number; pl_histdtdeletado: string; pl_histusdeletado: number; pl_deletado: number; pl_qntcompra: number; pl_quantidade: number;})
        {
        this.RECURSO = produtolote;
        this.FPlId = pl_id;
        this.FPlIdempresa = pl_idempresa;
        this.FPlIdproduto = pl_idproduto;
        this.FPlLote = pl_lote;
        this.FPlDtValidade = pl_dtvalidade;
        this.FPlDtFabricacao = pl_dtfabricacao;
        this.FPlHistdtcadastro = pl_histdtcadastro;
        this.FPlHistuscadastro = pl_histuscadastro;
        this.FPlHistdtalteracao = pl_histdtalteracao;
        this.FPlHistusalteracao = pl_histusalteracao;
        this.FPlHistdtdeletado = pl_histdtdeletado;
        this.FPlHistusdeletado = pl_histusdeletado;
        this.FPlDeletado = pl_deletado;
        this.FPlQntCompra = pl_qntcompra;
        this.FPlQuantidade = pl_quantidade;
    }
}

const TprodutoLote = ({

    RECURSO: 'produtolote',
    FIELD1: 'pl_id',
    FIELD2: 'pl_idempresa',
    FIELD3: 'pl_idproduto',
    FIELD4: 'pl_lote',
    FIELD5: 'pl_dtvalidade',
    FIELD6: 'pl_dtfabricacao',
    FIELD7: 'pl_histdtcadastro',
    FIELD8: 'pl_histuscadastro',
    FIELD9: 'pl_histdtalteracao',
    FIELD10: 'pl_histusalteracao',
    FIELD11: 'pl_histdtdeletado',
    FIELD12: 'pl_histusdeletado',
    FIELD13: 'pl_deletado',
    FIELD14: 'pl_qntcompra',
    FIELD15: 'pl_quantidade'

})







export{};