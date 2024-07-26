// // "use client"
// // import { createContext, ReactNode, useCallback, useContext, useState  } from "react";
// // import api from "@/services/api";

// // interface AuthContextState {
// //     token: TokenState;
// //     signIn({ username, password }: UserData): Promise<void>;
// // }

// // interface AuthProviderProps {
// //     children: ReactNode;
// // }

// // interface UserData {
// //     username: string;
// //     password: string;
// // }

// // interface TokenState {
// //     token: string;
// // }

// // const AuthContext = createContext<AuthContextState>({} as AuthContextState);

// // const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //     let [token, setToken] = useState<TokenState>({ token: '' });

// //     // let [token, setToken] = useState<TokenState>(() => {
// //     //    // const token = '15'
    
// //     //     // if (token) {

// //     //     //   return { token };
// //     //     // }
    
// //     //     return {} as TokenState;
// //     // });


// //     const signIn = useCallback(async ({ username, password }: UserData) =>{
// //         const token = '23';
// //         setToken({ token });
// //         console.log(username);
// //         console.log(password);
// //         // const response = await api.post("/usuario/login", {
// //         //     us_usuario: username,
// //         //     us_senha: password,
// //         // });

// //        // console.log(response.data);
// //     }, []);

// //     return (
// //         <AuthContext.Provider value={{token, signIn}}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // function useAuth(): AuthContextState {
// //     const context = useContext(AuthContext);
// //     return context
// // }

// // export { AuthProvider, useAuth };

// "use client"
// import { createContext, ReactNode, useCallback, useContext, useState  } from "react";

// interface AuthContextState {
//     token: TokenState;
//     signIn({ username, password }: UserData): Promise<void>;
// }

// interface AuthProviderProps {
//     children: ReactNode;
// }

// interface UserData {
//     username: string;
//     password: string;
// }

// interface TokenState {
//     token: string;
// }

// const AuthContext = createContext<AuthContextState>({} as AuthContextState);

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [token, setToken] = useState<TokenState>({ token: '' });

//     const signIn = useCallback(async ({ username, password }: UserData) =>{
//         //const token = '23';
//         const fetchedToken = '23';
//         setToken({ token: fetchedToken });
//         console.log("Token set to:", fetchedToken);
//         console.log("State token after setting:", token);
//         // const response = await api.post("/usuario/login", {
//         //     us_usuario: username,
//         //     us_senha: password,
//         // });
//        // console.log(response.data);
//     }, []);
    
//     console.log("State token after setting:", token);
   
//     return (
//         <AuthContext.Provider value={{ token, signIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// function useAuth(): AuthContextState {
//     const context = useContext(AuthContext);
//     return context
// }

// export { AuthProvider, useAuth };


"use client"
import { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
import api from "@/services/api";

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
        // Tenta carregar o token do localStorage
        // if (typeof window !== "undefined") {
        //     const storedToken = localStorage.getItem("token");
        //     return storedToken ? { token: storedToken } : { token: '' };
        // } else {
        //     return { token: '' };
        // }
        return {token: ''}
    });

    const signIn = useCallback(async ({ username, password }: UserData) => {
        const fetchedToken = '23';
        setToken({ token: fetchedToken });
        // const response = await api.post("/usuario/login", {
        //     us_usuario: username,
        //      us_senha: password,
        // });
        //console.log(response.data);
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

export { AuthProvider, useAuth };
