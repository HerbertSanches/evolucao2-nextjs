export class usuarioRoot {

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
            user.usuario, user.us_deletado, user.us_histdtalteracao, user.us_histdtcadastro, user.us_histdtdeletado, 
            user.us_histusalteracao, user.histuscadastro,user.us_histusdeletado,user.us_usuario, user.us_id, user.us_senha, user.us_idempresa,
            user.us_idfuncionario, user.us_us_cargo, user.us_funcionario, 
            user.us_uscadastro, user.us_grupoxusuario, user.us_vinculado));
    }}


class User {
    RECURSO: string; 
    UsDeletado: number;
    UsHistdtalteracao: string;
    UsHistdtcadastro: string;
    UsHistdtdeletado: string;
    UsHistusalteracao: number;
    UsHistuscadastro: number;
    UsHistusdeletado: number;
    UsUsuario: string;
    UsId: number;
    UsSenha: string;
    UsIdempresa: number;
    UsIdfuncionario: number;
    Cargo: string;
    UsFuncionario: string;
    UsCadastro: string;
    UsGrupoxUsuario: string[];
    UsVinculado: UsuarioVinculado[];

    constructor(
        usuario: string,
        us_deletado: number,
        us_histdtalteracao: string,
        us_histdtcadastro: string,
        us_histdtdeletado: string,
        us_histusalteracao: number,
        us_histuscadastro: number,
        us_histusdeletado: number,
        us_usuario: string,
        us_id: number,
        us_senha: string,
        us_idempresa: number,
        us_idfuncionario: number,
        us_cargo: string,
        us_funcionario: string,
        us_uscadastro: string,
        us_grupoxusuario: string[],
        us_vinculado: any[]
    ) { 
        this.RECURSO = usuario;
        this.UsDeletado = us_deletado;
        this.UsHistdtalteracao = us_histdtalteracao;
        this.UsHistdtcadastro = us_histdtcadastro;
        this.UsHistdtdeletado = us_histdtdeletado;
        this.UsHistusalteracao = us_histusalteracao;
        this.UsHistuscadastro = us_histuscadastro;
        this.UsHistusdeletado = us_histusdeletado;
        this.UsUsuario = us_usuario;
        this.UsId = us_id;
        this.UsSenha = us_senha;
        this.UsIdempresa = us_idempresa;
        this.UsIdfuncionario = us_idfuncionario;
        this.Cargo = us_cargo;
        this.UsFuncionario = us_funcionario;
        this.UsCadastro = us_uscadastro;
        this.UsGrupoxUsuario = us_grupoxusuario;
        this.UsVinculado = us_vinculado.map(vinculo => new UsuarioVinculado(
         vinculo.us_id, vinculo.us_idempresa
        ))

    }
}


export const TUsuario = ({

    RECURSO: 'usuario',
    FIELD1: 'us_id', 
    FIELD2: 'us_idempresa',
    FIELD3: 'us_idfuncionario',
    FIELD4: 'us_usuario',
    FIELD5: 'us_senha',
    FIELD6: 'us_histdtcadastro',
    FIELD7: 'us_histuscadastro',
    FIELD8: 'us_histdtalteracao',
    FIELD9: 'us_histusalteracao',
    FIELD10: 'us_histdtdeletado',
    FIELD11: 'us_histusdeletado',
    FIELD12: 'us_deletado',
    FIELD100: 'us_funcionario',
    FIELD101: 'us_grupoxusuario',
    FIELD102: 'us_uscadastro',
    FIELD103: 'us_cargo',
    FIELD104: 'us_usuariovinculado'

}) 


class UsuarioVinculado {
    UsId: number;
    UsIdEmpresa: number;

    constructor(
        us_id: number,
        us_idempresa: number,) 
    {
        this.UsId = us_id;
        this.UsIdEmpresa = us_idempresa;
    }


}
