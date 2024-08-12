class usuarioRoot {

    RegistroLimite: number;
    RegistroPosicao: number;
    RegistroTotal: number;
    Situacao: number;
    Usuario: User[];

    constructor({registro_limite, registro_posicao, registro_total, situacao, usuario}:
        { registro_limite: number, registro_posicao: number, registro_total: number, situacao: number, usuario: any[] })
        {
            this.RegistroLimite = registro_limite;
            this.RegistroPosicao = registro_posicao;
            this.RegistroTotal = registro_total;
            this.Situacao = situacao;
            this.Usuario = usuario.map(user => new User(
            user.usuario, user.us_id, user.us_usuario, user.us_senha, user.cliente, 
            user.gerarliberacao, user.cadastrar, user.prazo, user.cpf, user.us_idlocalidade,
            user.alteraliberacaolimmax, user.us_idfuncionario, user.us_idmonitoramento, 
            user.us_idsistema, user.us_idlocadicional, user.us_codtv, user.us_histuscadastro, 
            user.us_histdtcadastro, user.us_histusalteracao, user.us_histdtalteracao, 
            user.us_histusdeletado, user.us_histdtdeletado, user.us_deletado)
        );
    }
}


class User {
    
    RECURSO: string;
    UsId: number;
    UsUsuario: string;
    UsSenha: string;
    UsCliente: string;
    UsGerarLiberacao: boolean;
    UsCadastrar: boolean;
    UsPrazo: string;
    UsCPF: string;
    UsIdLocalidade: number;
    UsAlteraLiberacaoLimMax: boolean;
    UsIdFuncionario: number;
    UsIdMonitoramento: number;
    UsIdSistema: number;
    UsIdLocalidadeAdicional: number;
    UsCodTv: string;
    Ushistuscadastro: string;
    Ushistdtcadastro: string;
    Ushistusalteracao: string;
    Ushistdtalteracao: string;
    Ushistusdeletado: string;
    Ushistdtdeletado: string;
    Usdeletado: boolean;

    constructor(
        usuario: string, us_id: number, us_usuario: string, us_senha: string, cliente: string, 
        gerarliberacao: boolean, cadastrar: boolean, prazo: string, cpf: string, us_idlocalidade: number, 
        alteraliberacaolimmax: boolean, us_idfuncionario: number, us_idmonitoramento: number, 
        us_idsistema: number, us_idlocadicional: number, us_codtv: string, us_histuscadastro: string, 
        us_histdtcadastro: string, us_histusalteracao: string, us_histdtalteracao: string, 
        us_histusdeletado: string, us_histdtdeletado: string, us_deletado: boolean
    ) 
    
    { 
        this.RECURSO = usuario;
        this.UsId = us_id;
        this.UsUsuario = us_usuario;
        this.UsSenha = us_senha;
        this.UsCliente = cliente;
        this.UsGerarLiberacao = gerarliberacao;
        this.UsCadastrar = cadastrar;
        this.UsPrazo = prazo;
        this.UsCPF = cpf;
        this.UsIdLocalidade = us_idlocalidade;
        this.UsAlteraLiberacaoLimMax = alteraliberacaolimmax;
        this.UsIdFuncionario = us_idfuncionario;
        this.UsIdMonitoramento = us_idmonitoramento;
        this.UsIdSistema = us_idsistema;
        this.UsIdLocalidadeAdicional = us_idlocadicional;
        this.UsCodTv = us_codtv;
        this.Ushistuscadastro = us_histuscadastro;
        this.Ushistdtcadastro = us_histdtcadastro;
        this.Ushistusalteracao = us_histusalteracao;
        this.Ushistdtalteracao = us_histdtalteracao;
        this.Ushistusdeletado = us_histusdeletado;
        this.Ushistdtdeletado = us_histdtdeletado;
        this.Usdeletado = us_deletado;
    }
}

