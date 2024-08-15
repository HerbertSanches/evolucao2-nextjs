"use client"
import React, { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
// import api from '@/services/api';
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
        
        // const response = await api.post("/usuario/login", {
        //     us_idempresa: selectedCompanyId,
        //     us_usuario: username,
        //     us_senha: password,
        //     us_permissaoapp: 50,
        // });
        // console.log('Status da resposta:', response.data);


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


            if (responseData.data.usuario[0].us_id) {
                const id = responseData.data.usuario[0].us_id;
                setUserId(id)
    
                console.log(userId)
                console.log(responseData.data.usuario[0].us_id)
    
                const responseToken = await criarToken( {username, selectedCompanyId, userId:id} );
                setToken({ token:responseToken})
                
                localStorage.setItem("token", responseToken);
                localStorage.setItem("idUsuario", responseData.data.usuario[0].us_id);
                localStorage.setItem("nome", responseData.data.usuario[0].us_usuario);
                localStorage.setItem("idEmpresa", selectedCompanyId.toString());
            } 
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            alert("Erro ");
            // return "Erro ao fazer login"
        }






        //console.log(response.usuario.us_id)
        // if (response.data.usuario[0].us_id) {
        //     const id = response.data.usuario[0].us_id;
        //     setUserId(id)

        //     console.log(userId)
        //     console.log(response.data.usuario[0].us_id)

        //     const responseToken = await criarToken( {username, selectedCompanyId, userId:id} );
        //     setToken({ token:responseToken})
            
        //     localStorage.setItem("token", responseToken);
        //     localStorage.setItem("idUsuario", response.data.usuario[0].us_id);
        //     localStorage.setItem("nome", response.data.usuario[0].us_usuario);
        //     localStorage.setItem("idEmpresa", selectedCompanyId.toString());
        // } 

        // console.log(response.data);
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
    // console.log(process.env.RESTCHAVE_REQUEST)
    
    // console.log(process.env.NEXT_PUBLIC_REACT_APP_API)
    // console.log(process.env.NEXT_PUBLIC_REACT_APP_RESTCHAVE_REQUEST)
    

    // const encoded = process.env.NEXT_PUBLIC_REACT_APP_RESTCHAVE_REQUEST;
    // console.log(encoded)

    // const responseToken = await api.post("/autenticacao/create-token", {
    //     "au_chave":  encoded,
    //     "au_usuario": username,
    //     "au_idusuario": userId,
    //     "au_idempresa": selectedCompanyId,
    // });

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
        console.log(responseTokenData.data, responseTokenData)
        // const { response} = await responseToken.json();
        // console.log(response.data)
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