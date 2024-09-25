class MetaFuncionarioRoot {
    RegistroLimite: number;
    RegistroPosicao: number;
    RegistroTotal: number;
    Situacao: number;
    MetaFuncionarioArray: MetaFuncionario[];

    constructor({ registro_limite, registro_posicao, registro_total, situacao, metafuncionarioarray }:
        { registro_limite: number, registro_posicao: number, registro_total: number, situacao: number, metafuncionarioarray: any[] }) {
        this.RegistroLimite = registro_limite;
        this.RegistroPosicao = registro_posicao;
        this.RegistroTotal = registro_total;
        this.Situacao = situacao;
        this.MetaFuncionarioArray = metafuncionarioarray.map(meta => new MetaFuncionario(
            meta.mf_id,
            meta.mf_idmeta,
            meta.mf_idfuncionario,
            meta.mf_histuscadastro,
            meta.mf_histdtcadastro,
            meta.mf_histusalteracao,
            meta.mf_histdtalteracao,
            meta.mf_histusdeletado,
            meta.mf_histdtdeletado,
            meta.mf_deletado,
            meta.mf_vlrjan,
            meta.mf_vlrfev,
            meta.mf_vlrmar,
            meta.mf_vlrabr,
            meta.mf_vlrmai,
            meta.mf_vlrjun,
            meta.mf_vlrjul,
            meta.mf_vlrago,
            meta.mf_vlrset,
            meta.mf_vlrout,
            meta.mf_vlrnov,
            meta.mf_vlrdez,
            meta.mf_funcionario
        ))
    }
}

class MetaFuncionario {

    MfId: number;
    MfIdmeta: number;
    MfIdfuncionario: number;
    MfHistuscadastro: number;
    MfHistdtcadastro: string;
    MfHistusalteracao: number;
    MfHistdtalteracao: string;
    MfHistusdeletado: number;
    MfHistdtdeletado: string;
    MfDeletado: number;
    MfVlrjan: number;
    MfVlrfev: number;
    MfVlrmar: number;
    MfVlrabr: number;
    MfVlrmai: number;
    MfVlrjun: number;
    MfVlrjul: number;
    MfVlrago: number;
    MfVlrset: number;
    MfVlrout: number;
    MfVlrnov: number;
    MfVlrdez: number;
    MfFuncionario: string;

    constructor(
        mf_id: number,
        mf_idmeta: number,
        mf_idfuncionario: number,
        mf_histuscadastro: number,
        mf_histdtcadastro: string,
        mf_histusalteracao: number,
        mf_histdtalteracao: string,
        mf_histusdeletado: number,
        mf_histdtdeletado: string,
        mf_deletado: number,
        mf_vlrjan: number,
        mf_vlrfev: number,
        mf_vlrmar: number,
        mf_vlrabr: number,
        mf_vlrmai: number,
        mf_vlrjun: number,
        mf_vlrjul: number,
        mf_vlrago: number,
        mf_vlrset: number,
        mf_vlrout: number,
        mf_vlrnov: number,
        mf_vlrdez: number,
        mf_funcionario: string
    ) {
        this.MfId = mf_id;
        this.MfIdmeta = mf_idmeta;
        this.MfIdfuncionario = mf_idfuncionario;
        this.MfHistuscadastro = mf_histuscadastro;
        this.MfHistdtcadastro = mf_histdtcadastro;
        this.MfHistusalteracao = mf_histusalteracao;
        this.MfHistdtalteracao = mf_histdtalteracao;
        this.MfHistusdeletado = mf_histusdeletado;
        this.MfHistdtdeletado = mf_histdtdeletado;
        this.MfDeletado = mf_deletado;
        this.MfVlrjan = mf_vlrjan;
        this.MfVlrfev = mf_vlrfev;
        this.MfVlrmar = mf_vlrmar;
        this.MfVlrabr = mf_vlrabr;
        this.MfVlrmai = mf_vlrmai;
        this.MfVlrjun = mf_vlrjun;
        this.MfVlrjul = mf_vlrjul;
        this.MfVlrago = mf_vlrago;
        this.MfVlrset = mf_vlrset;
        this.MfVlrout = mf_vlrout;
        this.MfVlrnov = mf_vlrnov;
        this.MfVlrdez = mf_vlrdez;
        this.MfFuncionario = mf_funcionario;
    }
}

export const TMetaFuncionario = ({
    RECURSO: 'metafuncionario',
    FIELD1: 'mf_id',
    FIELD2: 'mf_idmeta',
    FIELD3: 'mf_idfuncionario',
    FIELD4: 'mf_histuscadastro',
    FIELD5: 'mf_histdtcadastro',
    FIELD6: 'mf_histusalteracao',
    FIELD7: 'mf_histdtalteracao',
    FIELD8: 'mf_histusdeletado',
    FIELD9: 'mf_histdtdeletado',
    FIELD10: 'mf_deletado',
    FIELD11: 'mf_vlrjan',
    FIELD12: 'mf_vlrfev',
    FIELD13: 'mf_vlrmar',
    FIELD14: 'mf_vlrabr',
    FIELD15: 'mf_vlrmai',
    FIELD16: 'mf_vlrjun',
    FIELD17: 'mf_vlrjul',
    FIELD18: 'mf_vlrago',
    FIELD19: 'mf_vlrset',
    FIELD20: 'mf_vlrout',
    FIELD21: 'mf_vlrnov',
    FIELD22: 'mf_vlrdez',
    FIELD100: 'mf_funcionario'

})