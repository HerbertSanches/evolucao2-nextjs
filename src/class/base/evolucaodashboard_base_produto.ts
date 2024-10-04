
class produto {

  RECURSO: string;
  PrId: number;
  PrIdempresa: number;
  PrDescricao: string;
  PrObs: string;
  PrCodigobarras: string;
  PrIdprodutooriginal: number;
  PrIdmarca: number;
  PrIdgrupo: number;
  PrIdsubgrupo: number;
  PrIdprodutotributacao: number;
  PrIdmodelo: number;
  PrIdunidademedida: number;
  Prncm: number;
  PrIdtipoproduto: number;
  PrIdlocacao: number;
  PrPercipi: number;
  PrPercicms: number;
  PrVlrcusto: number;
  PrVlrcompra: number;
  PrCest: string;
  PrPermitedesconto: number;
  PrControlarestoque: number;
  PrMonofasico: number;
  PrCombcodif: string;
  PrCombcodanp: string;
  PrCombdescsimp: string;
  PrCombpercglp: number;
  PrCombpercgnn: number;
  PrCombpercgni: number;
  PrCombvlrpartida: number;
  PrHistdtcadastro: string;
  PrHistuscadastro: number;
  PrHistdtalteracao: string;
  PrHistusalteracao: number;
  PrHistdtdeletado: string;
  PrHistusdeletado: number;
  PrDeletado: number;
  PrFarmnumeroregistro: string;
  PrFarmidclasseterapeutica: number;
  PrFarmfracao: number;
  PrFarmquantidadeprescrita: number;
  PrFarmiddenomicacaocomum: number;
  PrFarmabcatualizar: number;
  PrFarmprincipioativo: string;
  PrFarmapresentacao: string;
  PrFarmnomemedicamento: string;
  PrFarmidlistatributariamedicamento: number;
  PrPerccomissao: number;
  PrUsarcomissao: number;
  PrVlricmsreducao: number;
  PrIdindicadorpropriedade: number;
  PrAliqicms: number;
  PrIcmscstentrada: string;
  PrIcmscstsaida: string;
  PrIcmscfopentrada: string;
  PrIcmscfopsaida: string;
  PrIdnaturezareceita: number;
  PrIdplanocontas: number;
  PrGarantia: number;
  PrServico: number;
  PrCategoria: number;
  PrPrecoValor: number;
  PrPrecoTitulo: string;
  PrQnt: number;
  PrLocalEstoque: string;
  // Prgrupo: string;
  // Prsubgrupo: string;
  // Prmodelo: string;
  // Prmarca: string;
  // PrUnidademedida: string;
  // Prtipoproduto: string;
  // PrPlanoContas: string;
  // Prprodutotributacao: string;
  // PrLocacao: string;
  // PrNaturezareceita: string;
  PrLote: produtoLote[];
  

//{produto, pr_id, pr_idempresa, pr_descricao, pr_obs, pr_codigobarras, pr_idprodutooriginal, pr_idmarca, pr_idgrupo, pr_idsubgrupo, pr_idprodutotributacao, pr_idmodelo, pr_idunidademedida, pr_ncm, pr_idtipoproduto, pr_idlocacao, pr_percipi, pr_percicms, pr_vlrcusto, pr_vlrcompra, pr_cest, pr_permitedesconto, pr_controlarestoque, pr_monofasico, pr_combcodif, pr_combcodanp, pr_combdescsimp, pr_combpercglp, pr_combpercgnn, pr_combpercgni, pr_combvlrpartida, pr_histdtcadastro, pr_histuscadastro, pr_histdtalteracao, pr_histusalteracao, pr_histdtdeletado, pr_histusdeletado, pr_deletado, pr_farmnumeroregistro, pr_farmidclasseterapeutica, pr_farmfracao, pr_farmquantidadeprescrita, pr_farmiddenomicacaocomum, pr_farmabcatualizar, pr_farmprincipioativo, pr_farmapresentacao, pr_farmnomemedicamento, pr_farmidlistatributariamedicamento, pr_perccomissao, pr_usarcomissao, pr_vlricmsreducao, pr_idindicadorpropriedade, pr_aliqicms, pr_icmscstentrada, pr_icmscstsaida, pr_icmscfopentrada, pr_icmscfopsaida, pr_idnaturezareceita, pr_idplanocontas, pr_garantia, pr_servico, pr_categoria, pr_precovalor, pr_precotitulo, pr_qnt, pr_localestoque, pr_composicao, pr_lote, pr_preco, pr_estoque, pr_grupo, pr_subgrupo, pr_modelo, pr_marca, pr_unidademedida, pr_tipoproduto, pr_planocontas, pr_produtotributacao, pr_locacao, pr_naturezareceita, pr_prodrutocaracteristica, pr_indicepreco, pr_indicelocalestoque, pr_qntminima, pr_temlote, pr_temcaracteristica, pr_temcomposicao
//}: 


constructor(

  produto: string,
  pr_id: number,
  pr_idempresa: number,
  pr_descricao: string,
  pr_obs: string,
  pr_codigobarras: string,
  pr_idprodutooriginal: number,
  pr_idmarca: number,
  pr_idgrupo: number,
  pr_idsubgrupo: number,
  pr_idprodutotributacao: number,
  pr_idmodelo: number,
  pr_idunidademedida: number,
  pr_ncm: number,
  pr_idtipoproduto: number,
  pr_idlocacao: number,
  pr_percipi: number,
  pr_percicms: number,
  pr_vlrcusto: number,
  pr_vlrcompra: number,
  pr_cest: string,
  pr_permitedesconto: number,
  pr_controlarestoque: number,
  pr_monofasico: number,
  pr_combcodif: string,
  pr_combcodanp: string,
  pr_combdescsimp: string,
  pr_combpercglp: number,
  pr_combpercgnn: number,
  pr_combpercgni: number,
  pr_combvlrpartida: number,
  pr_histdtcadastro: string,
  pr_histuscadastro: number,
  pr_histdtalteracao: string,
  pr_histusalteracao: number,
  pr_histdtdeletado: string,
  pr_histusdeletado: number,
  pr_deletado: number,
  pr_farmnumeroregistro: string,
  pr_farmidclasseterapeutica: number,
  pr_farmfracao: number,
  pr_farmquantidadeprescrita: number,
  pr_farmiddenomicacaocomum: number,
  pr_farmabcatualizar: number,
  pr_farmprincipioativo: string,
  pr_farmapresentacao: string,
  pr_farmnomemedicamento: string,
  pr_farmidlistatributariamedicamento: number,
  pr_perccomissao: number,
  pr_usarcomissao: number,
  pr_vlricmsreducao: number,
  pr_idindicadorpropriedade: number,
  pr_aliqicms: number,
  pr_icmscstentrada: string,
  pr_icmscstsaida: string,
  pr_icmscfopentrada: string,
  pr_icmscfopsaida: string,
  pr_idnaturezareceita: number,
  pr_idplanocontas: number,
  pr_garantia: number,
  pr_servico: number,
  pr_categoria: number,
  pr_precovalor: number,
  pr_precotitulo: string,
  pr_qnt: number,
  pr_localestoque: string,
  pr_lote: any[], // assuming optional


 ) 
 {
     
      this.RECURSO = produto;
      this.PrId = pr_id;
      this.PrIdempresa = pr_idempresa;
      this.PrDescricao = pr_descricao;
      this.PrObs = pr_obs;
      this.PrCodigobarras = pr_codigobarras;
      this.PrIdprodutooriginal = pr_idprodutooriginal;
      this.PrIdmarca = pr_idmarca;
      this.PrIdgrupo = pr_idgrupo;
      this.PrIdsubgrupo = pr_idsubgrupo;
      this.PrIdprodutotributacao = pr_idprodutotributacao;
      this.PrIdmodelo = pr_idmodelo;
      this.PrIdunidademedida = pr_idunidademedida;
      this.Prncm = pr_ncm;
      this.PrIdtipoproduto = pr_idtipoproduto;
      this.PrIdlocacao = pr_idlocacao;
      this.PrPercipi = pr_percipi;
      this.PrPercicms = pr_percicms;
      this.PrVlrcusto = pr_vlrcusto;
      this.PrVlrcompra = pr_vlrcompra;
      this.PrCest = pr_cest;
      this.PrPermitedesconto = pr_permitedesconto;
      this.PrControlarestoque = pr_controlarestoque;
      this.PrMonofasico = pr_monofasico;
      this.PrCombcodif = pr_combcodif;
      this.PrCombcodanp = pr_combcodanp;
      this.PrCombdescsimp = pr_combdescsimp;
      this.PrCombpercglp = pr_combpercglp;
      this.PrCombpercgnn = pr_combpercgnn;
      this.PrCombpercgni = pr_combpercgni;
      this.PrCombvlrpartida = pr_combvlrpartida;
      this.PrHistdtcadastro = pr_histdtcadastro;
      this.PrHistuscadastro = pr_histuscadastro;
      this.PrHistdtalteracao = pr_histdtalteracao;
      this.PrHistusalteracao = pr_histusalteracao;
      this.PrHistdtdeletado = pr_histdtdeletado;
      this.PrHistusdeletado = pr_histusdeletado;
      this.PrDeletado = pr_deletado;
      this.PrFarmnumeroregistro = pr_farmnumeroregistro;
      this.PrFarmidclasseterapeutica = pr_farmidclasseterapeutica;
      this.PrFarmfracao = pr_farmfracao;
      this.PrFarmquantidadeprescrita = pr_farmquantidadeprescrita;
      this.PrFarmiddenomicacaocomum = pr_farmiddenomicacaocomum;
      this.PrFarmabcatualizar = pr_farmabcatualizar;
      this.PrFarmprincipioativo = pr_farmprincipioativo;
      this.PrFarmapresentacao = pr_farmapresentacao;
      this.PrFarmnomemedicamento = pr_farmnomemedicamento;
      this.PrFarmidlistatributariamedicamento = pr_farmidlistatributariamedicamento;
      this.PrPerccomissao = pr_perccomissao;
      this.PrUsarcomissao = pr_usarcomissao;
      this.PrVlricmsreducao = pr_vlricmsreducao;
      this.PrIdindicadorpropriedade = pr_idindicadorpropriedade;
      this.PrAliqicms = pr_aliqicms;
      this.PrIcmscstentrada = pr_icmscstentrada;
      this.PrIcmscstsaida = pr_icmscstsaida;
      this.PrIcmscfopentrada = pr_icmscfopentrada;
      this.PrIcmscfopsaida = pr_icmscfopsaida;
      this.PrIdnaturezareceita = pr_idnaturezareceita;
      this.PrIdplanocontas = pr_idplanocontas;
      this.PrGarantia = pr_garantia;
      this.PrServico = pr_servico;
      this.PrCategoria = pr_categoria;
      this.PrPrecoValor = pr_precovalor;
      this.PrPrecoTitulo = pr_precotitulo;
      this.PrQnt = pr_qnt;
      this.PrLocalEstoque = pr_localestoque;
      // this.Prgrupo = pr_grupo;
      // this.Prsubgrupo = pr_subgrupo;
      // this.Prmodelo = pr_modelo;
      // this.Prmarca = pr_marca;
      // this.PrUnidademedida = pr_unidademedida;
      // this.Prtipoproduto = pr_tipoproduto;
      // this.PrPlanoContas = pr_planocontas;
      // this.Prprodutotributacao = pr_produtotributacao;
      // this.PrLocacao = pr_locacao;
      // this.PrNaturezareceita = pr_naturezareceita;
      this.PrLote = pr_lote.map(lote => new produtoLote(lote.produtolote, lote.pl_id, lote.pl_idempresa, lote.pl_idproduto, lote.pl_lote, lote.pl_dtvalidade, lote.pl_dtfabricacao, lote.pl_histdtcadastro, lote.pl_histuscadastro, lote.pl_histdtalteracao, lote.pl_histusalteracao, lote.pl_histdtdeletado, lote.pl_histusdeletado, lote.pl_deletado, lote.pl_qntcompra, lote.pl_quantidade));
    }
}


class produtoEstoque {

    RECURSO: string;
    PeId: number;
    PeIdempresa: number;
    PeIdproduto: number;
    PeIdLocalEstoque: number;
    PeQnt: number; // Representado como number, mas no TypeScript será number
    PeQntMinima: number;
    PeQntMaxima: number;
    PeHistdtcadastro: string;
    PeHistuscadastro: number;
    PeHistdtalteracao: string;
    PeHistusalteracao: number;
    PeHistdtdeletado: string;
    PeHistusdeletado: number;
    PeDeletado: number;
    Pedescricao: string;

    constructor({produtoestoque, pe_id, pe_idempresa, pe_idproduto, pe_idlocalestoque, pe_qnt, pe_qntminima, pe_qntmaxima, pe_histdtcadastro, pe_histuscadastro, pe_histdtalteracao, pe_histusalteracao, pe_histdtdeletado, pe_histusdeletado, pe_deletado, pe_descricao}: 
                {produtoestoque: string; pe_id: number; pe_idempresa: number; pe_idproduto: number; pe_idlocalestoque: number; pe_qnt: number; pe_qntminima: number; pe_qntmaxima: number; pe_histdtcadastro: string; pe_histuscadastro: number; pe_histdtalteracao: string; pe_histusalteracao: number; pe_histdtdeletado: string; pe_histusdeletado: number; pe_deletado: number; pe_descricao: string;}) 
    {
        this.RECURSO = produtoestoque;
        this.PeIdempresa = pe_idempresa;
        this.PeId = pe_id;
        this.PeIdproduto = pe_idproduto;
        this.PeIdLocalEstoque = pe_idlocalestoque;
        this.PeQnt = pe_qnt;
        this.PeQntMinima = pe_qntminima;
        this.PeQntMaxima = pe_qntmaxima;
        this.PeHistdtcadastro = pe_histdtcadastro;
        this.PeHistuscadastro = pe_histuscadastro;
        this.PeHistdtalteracao = pe_histdtalteracao;
        this.PeHistusalteracao = pe_histusalteracao;
        this.PeHistdtdeletado = pe_histdtdeletado;
        this.PeHistusdeletado = pe_histusdeletado;
        this.PeDeletado = pe_deletado;
        this.Pedescricao = pe_descricao;
    }
}


const TProdutoEstoque = ({

    RECURSO: 'produtoestoque',
    TABELA: 'tb_produtoestoque',
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
    PpIdempresa: number;
    PpId: number;
    PpIdproduto: number;
    PpIndice: number;
    PpValor: number; // Representado como number, mas no TypeScript será number
    PpHistdtcadastro: string;
    PpHistuscadastro: number;
    PpHistdtalteracao: string;
    PpHistusalteracao: number;
    PpHistdtdeletado: string;
    PpHistusdeletado: number;
    PpDeletado: number;

    constructor({preco, pp_id, pp_idempresa, pp_idproduto, pp_indice, pp_valor, pp_histdtcadastro, pp_histuscadastro, pp_histdtalteracao, pp_histusalteracao, pp_histdtdeletado, pp_histusdeletado, pp_deletado}: 
                {preco: string; pp_id: number; pp_idempresa: number; pp_idproduto: number; pp_indice: number; pp_valor: number; pp_histdtcadastro: string; pp_histuscadastro: number; pp_histdtalteracao: string; pp_histusalteracao: number; pp_histdtdeletado: string; pp_histusdeletado: number; pp_deletado: number;}) 
    {
        this.RECURSO = preco;
        this.PpId = pp_id;
        this.PpIdempresa = pp_idempresa;
        this.PpIdproduto = pp_idproduto;
        this.PpIndice = pp_indice;
        this.PpValor = pp_valor;
        this.PpHistdtcadastro = pp_histdtcadastro;
        this.PpHistuscadastro = pp_histuscadastro;
        this.PpHistdtalteracao = pp_histdtalteracao;
        this.PpHistusalteracao = pp_histusalteracao;
        this.PpHistdtdeletado = pp_histdtdeletado;
        this.PpHistusdeletado = pp_histusdeletado;
        this.PpDeletado = pp_deletado;
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
    PlId: number;
    PlIdempresa: number;
    PlIdproduto: number;
    PlLote: string;
    PlDtValidade: string;
    PlDtFabricacao: string;
    PlHistdtcadastro: string;
    PlHistuscadastro: number;
    PlHistdtalteracao: string;
    PlHistusalteracao: number;
    PlHistdtdeletado: string;
    PlHistusdeletado: number;
    PlDeletado: number;
    PlQntCompra: number; // Representado como number, mas no TypeScript será number
    PlQuantidade: number; // Representado como number, mas no TypeScript será number

    //(produtolote, pl_id, pl_idempresa, pl_idproduto, pl_lote, pl_dtvalidade, pl_dtfabricacao, pl_histdtcadastro, pl_histuscadastro, pl_histdtalteracao, pl_histusalteracao, pl_histdtdeletado, pl_histusdeletado, pl_deletado, pl_qntcompra, pl_quantidade)

    constructor(produtolote: string, pl_id: number, pl_idempresa: number, pl_idproduto: number, pl_lote: string, pl_dtvalidade: string, pl_dtfabricacao: string, pl_histdtcadastro: string, pl_histuscadastro: number, pl_histdtalteracao: string, pl_histusalteracao: number, pl_histdtdeletado: string, pl_histusdeletado: number, pl_deletado: number, pl_qntcompra: number, pl_quantidade: number)
        {
        this.RECURSO = produtolote;
        this.PlId = pl_id;
        this.PlIdempresa = pl_idempresa;
        this.PlIdproduto = pl_idproduto;
        this.PlLote = pl_lote;
        this.PlDtValidade = pl_dtvalidade;
        this.PlDtFabricacao = pl_dtfabricacao;
        this.PlHistdtcadastro = pl_histdtcadastro;
        this.PlHistuscadastro = pl_histuscadastro;
        this.PlHistdtalteracao = pl_histdtalteracao;
        this.PlHistusalteracao = pl_histusalteracao;
        this.PlHistdtdeletado = pl_histdtdeletado;
        this.PlHistusdeletado = pl_histusdeletado;
        this.PlDeletado = pl_deletado;
        this.PlQntCompra = pl_qntcompra;
        this.PlQuantidade = pl_quantidade;
    }
}

const TProdutoLote = ({

    RECURSO: 'produtolote',
    TABELA: 'tb_produtolote',
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



class produtoComposicao {
    RECURSO: string;
    PcId: number;
    PcIdempresa: number;
    PcIdproduto: number;
    PcIdProdutoPai: number;
    PcNumeroComposicao: number;
    PcQnt: number;
    PcHistdtcadastro: string;
    PcHistuscadastro: number;
    PcHistdtalteracao: string;
    PcHistusalteracao: number;
    PcHistdtdeletado: string;
    PcHistusdeletado: number;
    PcDeletado: number;
    PcDescricao: string;
  
    constructor({produtocomposicao, pc_id, pc_idempresa, pc_idproduto, pc_idprodutopai, pc_numerocomposicao, pc_qnt, pc_histdtcadastro, pc_histuscadastro, pc_histdtalteracao, pc_histusalteracao, pc_histdtdeletado, pc_histusdeletado, pc_deletado, pc_descricao,}: 
                {produtocomposicao: string; pc_id: number; pc_idempresa: number; pc_idproduto: number; pc_idprodutopai: number; pc_numerocomposicao: number; pc_qnt: number; pc_histdtcadastro: string; pc_histuscadastro: number; pc_histdtalteracao: string; pc_histusalteracao: number; pc_histdtdeletado: string; pc_histusdeletado: number; pc_deletado: number; pc_descricao: string;}) 
    {
      this.RECURSO = produtocomposicao;
      this.PcId = pc_id;
      this.PcIdempresa = pc_idempresa;
      this.PcIdproduto = pc_idproduto;
      this.PcIdProdutoPai = pc_idprodutopai;
      this.PcNumeroComposicao = pc_numerocomposicao;
      this.PcQnt = pc_qnt;
      this.PcHistdtcadastro = pc_histdtcadastro;
      this.PcHistuscadastro = pc_histuscadastro;
      this.PcHistdtalteracao = pc_histdtalteracao;
      this.PcHistusalteracao = pc_histusalteracao;
      this.PcHistdtdeletado = pc_histdtdeletado;
      this.PcHistusdeletado = pc_histusdeletado;
      this.PcDeletado = pc_deletado;
      this.PcDescricao = pc_descricao;
    }
  }


  const TProdutoComposicao = ({

    RECURSO: 'produtocomposicao',
    FIELD1: 'pc_id',
    FIELD2: 'pc_idempresa',
    FIELD3: 'pc_idproduto',
    FIELD4: 'pc_idprodutopai',
    FIELD5: 'pc_numerocomposicao',
    FIELD6: 'pc_qnt',
    FIELD7: 'pc_histdtcadastro',
    FIELD8: 'pc_histuscadastro',
    FIELD9: 'pc_histdtalteracao',
    FIELD10: 'pc_histusalteracao',
    FIELD11: 'pc_histdtdeletado',
    FIELD12: 'pc_histusdeletado',
    FIELD13: 'pc_deletado',
    FIELD100: 'pc_descricao'

  })
  

  class produtoCaracteristica {

    RECURSO: string;
    PcId: number;
    PcIdempresa: number;
    PcIdproduto: number;
    PcIdcaractitem: number;
    PcHistdtcadastro: string;
    PcHistuscadastro: number;
    PcHistdtalteracao: string;
    PcHistusalteracao: number;
    PcHistdtdeletado: string;
    PcHistusdeletado: number;
    PcDeletado: number;
    PcDescricao: string;
  
    constructor({produtocaracteristica, pc_id, pc_idempresa, pc_idproduto, pc_idcaractitem, pc_histdtcadastro, pc_histuscadastro, pc_histdtalteracao, pc_histusalteracao, pc_histdtdeletado, pc_histusdeletado, pc_deletado, pc_descricao}: 
                {produtocaracteristica:string; pc_id: number; pc_idempresa: number; pc_idproduto: number; pc_idcaractitem: number; pc_histdtcadastro: string; pc_histuscadastro: number; pc_histdtalteracao: string; pc_histusalteracao: number; pc_histdtdeletado: string; pc_histusdeletado: number; pc_deletado: number; pc_descricao: string;}) 
    {
      this.RECURSO = produtocaracteristica;
      this.PcId = pc_id;
      this.PcIdempresa = pc_idempresa;
      this.PcIdproduto = pc_idproduto;
      this.PcIdcaractitem = pc_idcaractitem;
      this.PcHistdtcadastro = pc_histdtcadastro;
      this.PcHistuscadastro = pc_histuscadastro;
      this.PcHistdtalteracao = pc_histdtalteracao;
      this.PcHistusalteracao = pc_histusalteracao;
      this.PcHistdtdeletado = pc_histdtdeletado;
      this.PcHistusdeletado = pc_histusdeletado;
      this.PcDeletado = pc_deletado;
      this.PcDescricao = pc_descricao;
    }
  }
  

  const TProdutoCaracteristica = ({

    RECURSO: 'produtocaracteristica',
    FIELD1: 'pc_id',
    FIELD2: 'pc_idempresa',
    FIELD3: 'pc_idproduto',
    FIELD4: 'pc_idcaractitem',
    FIELD5: 'pc_histdtcadastro',
    FIELD6: 'pc_histuscadastro',
    FIELD7: 'pc_histdtalteracao',
    FIELD8: 'pc_histusalteracao',
    FIELD9: 'pc_histdtdeletado',
    FIELD10: 'pc_histusdeletado',
    FIELD11: 'pc_deletado',
    FIELD100: 'pc_descricao'

  })

  const TProduto = ({
    RECURSO : 'produto',
    TABELA  : 'tb_produto',
    VIEW    : 'sel_produto',

    RECURSO_SERVICO : 'servico',
    VIEW_SERVICO    : 'sel_servico',

    tpPRODUTO : 1,
    tpSERVICO : 2,

    FIELD1 : 'pr_id',
    FIELD2 : 'pr_idempresa',
    FIELD3 : 'pr_descricao',
    FIELD4 : 'pr_obs',
    FIELD5 : 'pr_codigobarras',
    FIELD6 : 'pr_idprodutooriginal',
    FIELD7 : 'pr_idmarca',
    FIELD8 : 'pr_idgrupo',
    FIELD9 : 'pr_idsubgrupo',
    FIELD10 : 'pr_idprodutotributacao',
    FIELD11 : 'pr_idmodelo',
    FIELD12 : 'pr_idunidademedida',
    FIELD13 : 'pr_ncm',
    FIELD14 : 'pr_idtipoproduto',
    FIELD15 : 'pr_idlocacao',
    FIELD16 : 'pr_percipi',
    FIELD17 : 'pr_percicms',
    FIELD18 : 'pr_vlrcusto',
    FIELD19 : 'pr_vlrcompra',
    FIELD20 : 'pr_cest',
    FIELD21 : 'pr_permitedesconto',
    FIELD22 : 'pr_controlarestoque',
    // FIELD23 : 'pr_aferido',
    // FIELD24 : 'pr_balanca',
    FIELD25 : 'pr_monofasico',
    FIELD26 : 'pr_combcodif',
    FIELD27 : 'pr_combcodanp',
    FIELD28 : 'pr_combdescsimp',
    FIELD29 : 'pr_combpercglp',
    FIELD30 : 'pr_combpercgnn',
    FIELD31 : 'pr_combpercgni',
    FIELD32 : 'pr_combvlrpartida',
    // FIELD33 : 'pr_combustivel',
    FIELD34 : 'pr_histdtcadastro',
    FIELD35 : 'pr_histuscadastro',
    FIELD36 : 'pr_histdtalteracao',
    FIELD37 : 'pr_histusalteracao',
    FIELD38 : 'pr_histdtdeletado',
    FIELD39 : 'pr_histusdeletado',
    FIELD40 : 'pr_deletado',

    FIELD47 : 'pr_farmnumeroregistro',
    FIELD48 : 'pr_farmidclasseterapeutica',
    FIELD49 : 'pr_farmfracao',
    FIELD50 : 'pr_farmquantidadeprescrita',
    FIELD51 : 'pr_farmiddenomicacaocomum',
    FIELD52 : 'pr_farmabcatualizar',
    FIELD53 : 'pr_farmprincipioativo',
    FIELD54 : 'pr_farmapresentacao',
    FIELD55 : 'pr_farmnomemedicamento',
    FIELD56 : 'pr_farmidlistatributariamedicamento',
    FIELD57 : 'pr_perccomissao',
    FIELD58 : 'pr_usarcomissao',
    FIELD59 : 'pr_percicmsreducao',
    FIELD60 : 'pr_idindicadorpropriedade',
    FIELD61 : 'pr_percicmsdeson',
    FIELD62 : 'pr_icmscstentrada',
    FIELD63 : 'pr_icmscstsaida',
    FIELD64 : 'pr_icmscfopentrada',
    FIELD65 : 'pr_icmscfopsaida',
    FIELD66 : 'pr_idnaturezareceita',
    FIELD67 : 'pr_idplanocontas',
    FIELD68 : 'pr_garantia',
    FIELD69 : 'pr_servico',
    FIELD70 : 'pr_categoria',
    FIELD71 : 'pr_pesobruto',
    FIELD72 : 'pr_pesoliquido',
    FIELD73 : 'pr_motivoicmsdeson',
    FIELD74 : 'pr_piscstsaida',
    FIELD75 : 'pr_piscstentrada',
    FIELD76 : 'pr_cofinscstsaida',
    FIELD77 : 'pr_cofinscstentrada',
    FIELD78 : 'pr_pisaliqsaida',
    FIELD79 : 'pr_pisaliqentrada',
    FIELD80 : 'pr_cofinsaliqsaida',
    FIELD81 : 'pr_cofinsaliqentrada',

    // campos artificiais
    FIELD100 : 'pr_precovalor',
    FIELD101 : 'pr_precotitulo',
    FIELD102 : 'pr_qnt',
    FIELD103 : 'pr_localestoque',
    FIELD104 : 'pr_composicao',
    FIELD105 : 'pr_lote',
    FIELD106 : 'pr_preco',
    FIELD107 : 'pr_estoque',
    FIELD108 : 'pr_grupo',
    FIELD109 : 'pr_subgrupo',
    FIELD110 : 'pr_modelo',
    FIELD111 : 'pr_marca',
    FIELD112 : 'pr_unidademedida',
    FIELD113 : 'pr_tipoproduto',
    FIELD114 : 'pr_planocontas',
    FIELD116 : 'pr_produtotributacao',
    FIELD117 : 'pr_locacao',
    FIELD118 : 'pr_naturezareceita',
    FIELD119 : 'pr_prodrutocaracteristica',
    FIELD120 : 'pr_indicepreco',
    FIELD121 : 'pr_indicelocalestoque',
    FIELD122 : 'pr_qntminima',

    FIELD123 : 'pr_temlote',
    FIELD124 : 'pr_temcaracteristica',
    FIELD125 : 'pr_temcomposicao',

    FIELD126 : 'pr_desccategoria'

  })

export { TProduto, TProdutoCaracteristica, TProdutoEstoque, TProdutoPreco, TProdutoComposicao,TProdutoLote };