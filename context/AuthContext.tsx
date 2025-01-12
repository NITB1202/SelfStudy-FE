// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import {Role} from "@/enum/RoleEnum"
// import authAPI from '@/apis/authAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { decodeToken } from '@/util/decodeToken';

// interface AuthState {
//   authenticated: boolean;
//   id: number | null;
//   role: Role | null;
// }

// interface AuthProps {
//   authState: AuthState;
//   onLogin: (username: string, password: string, rememeber: boolean) => Promise<AuthState>;
//   onLogout: () => void;
// }

// const AuthContext = createContext<AuthProps | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     authenticated: false,
//     id: null,
//     role: null,
//   });

//   const restoreAuthState = async () => {
//     try {
//       const remember = await AsyncStorage.getItem("remember");
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       if (remember && accessToken) {
//         const decodedToken = decodeToken(accessToken);
//         let userRole = null;

//         switch (decodedToken.role) {
//           case "MANAGER":
//             userRole = Role.MANAGER;
//             break;
//           case "STUDENT":
//             userRole = Role.STUDENT;
//             break;
//           case "TEACHER":
//             userRole = Role.TEACHER;
//             break;
//         }

//         setAuthState({
//           authenticated: true,
//           id: Number(decodedToken.id),
//           role: userRole,
//         });
//       }
//     } catch (error) {
//       console.log("Error restoring auth state from AsyncStorage: ", error);
//     }
//   };

//   useEffect(() => {
//     restoreAuthState();
//   }, []);


//   const onLogin = async (username: string, password: string, rememeber: boolean): Promise<AuthState> => {

//     try{
//       const response = await authAPI.login(username, password);
//       const accessToken = response.data.accToken;
//       const refreshToken = response.data.refreshToken;

//       if(rememeber) AsyncStorage.setItem("remember", "true");

//       AsyncStorage.setItem("accessToken", accessToken);
//       AsyncStorage.setItem("refreshToken", refreshToken);

//       const decodedToken = decodeToken(accessToken);

//       let userRole = null;
//       switch(decodedToken.role){
//         case "MANAGER": 
//           userRole = Role.MANAGER;
//           break;
//         case "STUDENT":
//           userRole = Role.STUDENT;
//           break;
//         case "TEACHER":
//           userRole = Role.TEACHER;
//           break;
//       }

//       const authState = {
//         authenticated: true,
//         id: Number(decodedToken.id),
//         role: userRole,
//       }

//       setAuthState(authState);

//       return authState;
//     }
//     catch(error){
//       console.log("Unexpected error has occured: " + error);
//       return {
//         authenticated: false,
//         id: null,
//         role: null,
//       };
//     }
//   };

//   const onLogout = () => {
//     setAuthState({
//       authenticated: false,
//       id: null,
//       role: null,
//     });

//     AsyncStorage.removeItem("accessToken");
//     AsyncStorage.removeItem("refreshToken");
//     AsyncStorage.removeItem("remember");
//   };

//   return (
//     <AuthContext.Provider value={{ authState, onLogin, onLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

