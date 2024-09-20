"use client"
import React, { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {usuarioRoot} from '../class/base/evolucaodashboard_base_usuario'
import {tokenRoot, TToken} from '../class/base/evolucaodashboard_base_token';

interface AuthContextState {
    token: TokenState;
    idEmpresa: Number;
    signIn(userData: UserData): Promise<void>;
    
}

interface AuthProviderProps {
    children: ReactNode;
}

interface UserData {
    username: string;
    password: string;
    selectedCompanyId: number;
}

interface chamarToken {
    username: string;
    selectedCompanyId: number;
    userId: number;
}

interface TokenState {
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter();

    const [userId, setUserId] = useState(0);
    const [idEmpresa, setIdEmpresa] = useState(0);
    const [token, setToken] = useState<TokenState>(() => {
        return {token: ''}
    });

    const signIn = useCallback(async ({ username, password, selectedCompanyId }: UserData) => {
        console.log("CHAMOU")
        let user

        try {
            const responseLogin = await fetch('/api/criptografia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'login', 
                    input: username,
                    input2: password,
                    input3: selectedCompanyId, 
                    
                })
            });
              
            const responseData = await responseLogin.json();
            
            if (!responseLogin.ok || !responseData || !responseData.data) {
            throw new Error('Falha ao realizar login');
            }
            
            console.log(responseData.data, "criou login");

            if (Array.isArray(responseData.data.usuario) && responseData.data.usuario.length > 0) {
                
                user = new usuarioRoot(responseData.data);
                console.log(responseData.data.usuario)
                localStorage.setItem('usuarioGrupo', JSON.stringify(responseData.data.usuario[0].us_usuariovinculado))


                console.log(user)
                console.log(user.Usuario)
                console.log(user.Usuario[0].UsId)

                const id = responseData.data.usuario[0].us_id;
                setUserId(id)
                setIdEmpresa(selectedCompanyId);

                const responseToken = await criarToken( {username, selectedCompanyId, userId:id} );
                setToken({ token:responseToken})
                console.log(token)
                
                
                localStorage.setItem("token", responseToken);
                localStorage.setItem("idUsuario", user.Usuario[0].UsId.toString());
                //localStorage.setItem("nomeFuncionario", user.Usuario[0].UsUsuario);
                localStorage.setItem("idEmpresa", selectedCompanyId.toString());

                router.push('/dashboard');
            } else {
                console.error("Erro: 'usuario' está indefinido ou não é um array.");
            }
                 
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            alert("Erro aaaaaaaaa");
        }

    }, []);

    useEffect(() => {
        console.log("Current token state:", token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, idEmpresa,signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

const criarToken = async ( {username, selectedCompanyId, userId}:  chamarToken) => {
    // let token
    
    try {
        const responseToken = await fetch('/api/criptografia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'token', 
            input: username,
            input2: userId,
            input3: selectedCompanyId, 
          })
        });
        
        if (!responseToken.ok) {
          throw new Error('Falha ao criptografar a senha');
        }
        const responseTokenData = await responseToken.json();

        // console.log(responseTokenData.data, responseTokenData)
        
        // token = new tokenRoot(responseTokenData.data);
        // console.log(token.AuChave)
        // console.log(token.AuIDEmpresa)

        return responseTokenData.data
    } catch (error) {
        console.error("Erro ao criar token: ", error);
        alert("Erro ao fazer login");
        return "Erro ao criar token"
    }
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado com o authProvider");
    }
    return context;
}

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();
        useEffect(() => { 
            if (!localStorage.getItem('token')) {
                router.push('/login/evolucao');
            }
        },[router]);
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
}

export { AuthProvider, useAuth, withAuth };