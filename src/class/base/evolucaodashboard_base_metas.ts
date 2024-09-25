export class metaRoot{

    // RegistroLimite: number;
    // RegistroPosicao: number;
    // RegistroTotal: number;
    // Situacao: number;
    //Meta: Meta[];
}



class Meta {
    RECURSO: string;
    MtId: number;
    MtIdempresa: number;
    MtAnovigente: number;
    MtVlrAnual: number;
    MtHistuscadastro: number;
    MtHistdtcadastro: string;
    MtHistusalteracao: number;
    MtHistdtalteracao: string;
    MtHistusdeletado: number;
    MtHistdtdeletado: string;
    MtDeletado: number;
    MtVlrjan: number;
    MtVlrfev: number;
    MtVlrmar: number;
    MtVlrabr: number;
    MtVlrmai: number;
    MtVlrjun: number;
    MtVlrjul: number;
    MtVlrago: number;
    MtVlrset: number;
    MtVlrout: number;
    MtVlrnov: number;
    MtVlrdez: number;
    MetaFuncionarioArray: string[];
  
    constructor(
      RECURSO: string,
      mt_id: number,
      mt_idempresa: number,
      mt_anovigente: number,
      mt_vlranual: number,
      mt_histuscadastro: number,
      mt_histdtcadastro: string,
      mt_histusalteracao: number,
      mt_histdtalteracao: string,
      mt_histusdeletado: number,
      mt_histdtdeletado: string,
      mt_deletado: number,
      mt_vlrjan: number,
      mt_vlrfev: number,
      mt_vlrmar: number,
      mt_vlrabr: number,
      mt_vlrmai: number,
      mt_vlrjun: number,
      mt_vlrjul: number,
      mt_vlrago: number,
      mt_vlrset: number,
      mt_vlrout: number,
      mt_vlrnov: number,
      mt_vlrdez: number,
      mfuncionario: string[]
    ) {
      this.RECURSO = RECURSO;
      this.MtId = mt_id;
      this.MtIdempresa = mt_idempresa;
      this.MtAnovigente = mt_anovigente;
      this.MtVlrAnual = mt_vlranual;
      this.MtHistuscadastro = mt_histuscadastro;
      this.MtHistdtcadastro = mt_histdtcadastro;
      this.MtHistusalteracao = mt_histusalteracao;
      this.MtHistdtalteracao = mt_histdtalteracao;
      this.MtHistusdeletado = mt_histusdeletado;
      this.MtHistdtdeletado = mt_histdtdeletado;
      this.MtDeletado = mt_deletado;
      this.MtVlrjan = mt_vlrjan;
      this.MtVlrfev = mt_vlrfev;
      this.MtVlrmar = mt_vlrmar;
      this.MtVlrabr = mt_vlrabr;
      this.MtVlrmai = mt_vlrmai;
      this.MtVlrjun = mt_vlrjun;
      this.MtVlrjul = mt_vlrjul;
      this.MtVlrago = mt_vlrago;
      this.MtVlrset = mt_vlrset;
      this.MtVlrout = mt_vlrout;
      this.MtVlrnov = mt_vlrnov;
      this.MtVlrdez = mt_vlrdez;
      this.MetaFuncionarioArray = mfuncionario;
    }
  }

export const TMeta = ({
    RECURSO: 'meta',
    FIELD1: 'mt_id',
    FIELD2: 'mt_idempresa',
    FIELD3: 'mt_anovigente',
    FIELD4: 'mt_vlranual',
    FIELD5: 'mt_histuscadastro',
    FIELD6: 'mt_histdtcadastro',
    FIELD7: 'mt_histusalteracao',
    FIELD8: 'mt_histdtalteracao',
    FIELD9: 'mt_histusdeletado',
    FIELD10: 'mt_histdtdeletado',
    FIELD11: 'mt_deletado',
    FIELD12: 'mt_vlrjan',
    FIELD13: 'mt_vlrfev',
    FIELD14: 'mt_vlrmar',
    FIELD15: 'mt_vlrabr',
    FIELD16: 'mt_vlrmai',
    FIELD17: 'mt_vlrjun',
    FIELD18: 'mt_vlrjul',
    FIELD19: 'mt_vlrago',
    FIELD20: 'mt_vlrset',
    FIELD21: 'mt_vlrout',
    FIELD22: 'mt_vlrnov',
    FIELD23: 'mt_vlrdez',
    FIELD100: 'mfuncionario',
})
