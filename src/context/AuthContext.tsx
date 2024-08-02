"use client"
import React, { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from 'next/navigation';


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
}

interface TokenState {
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<TokenState>(() => {
        return {token: ''}
    });

    const signIn = useCallback(async ({ username, password }: UserData) => {
        const fetchedToken = '23';
        setToken({ token: fetchedToken });

        const response = await api.post("/usuario/login", {
            us_idempresa: 2,
            us_usuario: username,
            us_senha: password,
            us_permissaoapp: 190,
        });
        

        console.log(response.data);
        localStorage.setItem("token", fetchedToken);
        //localStorage.setItem("token", fetchedToken);  
        console.log("Token set to:", fetchedToken);
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