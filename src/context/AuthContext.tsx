"use client"
import React, { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
import api from '@/services/api';
import { useRouter } from 'next/navigation';
// import { encode, RESTCHAVE_REQUEST, getSHA } from '../pages/api/criptografia';
import { error } from "console";


interface AuthContextState {
    token: TokenState;
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
    const [token, setToken] = useState<TokenState>(() => {
        return {token: ''}
    });

    const signIn = useCallback(async ({ username, password, selectedCompanyId }: UserData) => {
        console.log(selectedCompanyId)
        const response = await api.post("/usuario/login", {
            us_idempresa: selectedCompanyId,
            us_usuario: username,
            us_senha: password,
            us_permissaoapp: 50,
        });
        console.log('Status da resposta:', response.data);
        //console.log(response.usuario.us_id)
        if (response.data.usuario[0].us_id) {
            const id = response.data.usuario[0].us_id;
            setUserId(id)

            console.log(userId)
            console.log(response.data.usuario[0].us_id)

            const responseToken = await criarToken( {username, selectedCompanyId, userId:id} );
            setToken({ token:responseToken})
            
            localStorage.setItem("token", responseToken);
            localStorage.setItem("idUsuario", response.data.usuario[0].us_id);
            localStorage.setItem("nome", response.data.usuario[0].us_usuario);
            localStorage.setItem("idEmpresa", selectedCompanyId.toString());
        } 

        console.log(response.data);
    }, []);

    useEffect(() => {
        console.log("Current token state:", token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

const criarToken = async ( {username, selectedCompanyId, userId}:  chamarToken) => {
    
    // const encoded = await getSHA( RESTCHAVE_REQUEST )
    const encoded = process.env.RESTCHAVE_REQUEST;
    console.log(encoded)

    const responseToken = await api.post("/autenticacao/create-token", {
        "au_chave":  encoded,
        "au_usuario": username,
        "au_idusuario": userId,
        "au_idempresa": selectedCompanyId,
    });
    console.log(responseToken.data)
    return responseToken.data
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
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