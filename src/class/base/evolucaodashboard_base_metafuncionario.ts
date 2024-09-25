







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
