import { Role } from "@/enum/Role";
import { decodeToken } from "@/util/jwtUtil";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from "@/api/userApi";

interface AuthContextProps{
    isAuthenticated: boolean;
    userId: string;
    role: Role | null;
    login: (accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authInfo, setAuthInfo] = useState
    <{
        isAuthenticated: boolean,
        userId: string,
        role: Role | null
    }>
    ({
        isAuthenticated: false,
        userId: "",
        role: null,
    })

    useEffect(()=>{
        const resetState = async ()=>{
            try{
                const accessToken = await AsyncStorage.getItem("accessToken");
                if(accessToken === null)
                {
                    setAuthInfo({
                      isAuthenticated: false,
                      userId: "",
                      role: null  
                    });
                }
                else
                {
                    const decodedToken = decodeToken(accessToken);
                    const role = decodedToken.role === "USER"? Role.USER : Role.ADMIN;
                    const id = decodedToken.id;

                    const response: any  = await userApi.getById(id);

                    AsyncStorage.setItem("username", response.username);
                    AsyncStorage.setItem("avatar", response.avatarLink);

                    setAuthInfo({
                        isAuthenticated: true,
                        userId: decodedToken.id,
                        role: role
                    });
                }
            }
            catch(error){
                console.log(error);
            }

        };
    resetState();
    },[]);

    const login = async (accessToken: string) => {
        try{
            const decodedToken = decodeToken(accessToken);
            AsyncStorage.setItem("accessToken", accessToken);
            const role = decodedToken.role === "USER"? Role.USER : Role.ADMIN;
            const id = decodedToken.id;

            const response: any  = await userApi.getById(id);

            AsyncStorage.setItem("username", response.username);
            AsyncStorage.setItem("avatar", response.avatarLink);

            const userInfo = {
                isAuthenticated: true,
                userId: decodedToken.id,
                role: role
            };

            setAuthInfo(userInfo);
        }
        catch(error){
            console.log(error);
        }
    };
  
    const logout = () => {
      AsyncStorage.clear();
      setAuthInfo({
        isAuthenticated: false,
        userId: "",
        role: null
      })
    };
  
    return (
        <AuthContext.Provider
          value={{
            isAuthenticated: authInfo.isAuthenticated,
            userId: authInfo.userId,
            role: authInfo.role,
            login,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};