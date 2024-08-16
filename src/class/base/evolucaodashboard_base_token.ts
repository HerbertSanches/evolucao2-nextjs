class tokenRoot {

    RECURSO: string;
    AuChave : string;
    AuUsuario: string;
    AuIDEmpresa: string;
    AuIDUsuario: string;

    constructor({autenticacao, au_chave, au_usuario, au_idempresa, au_idusuario}:
    {autenticacao: string; au_chave: string; au_usuario: string; au_idempresa: string; au_idusuario: string })
    {
        this.RECURSO = autenticacao;
        this.AuChave = au_chave;
        this.AuUsuario = au_usuario;
        this.AuIDEmpresa = au_idempresa;
        this.AuIDUsuario = au_idusuario;
    }
}

export {tokenRoot};