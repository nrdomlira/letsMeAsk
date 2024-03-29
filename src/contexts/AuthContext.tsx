import { useState, createContext, useEffect, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";


type User = {
    uid: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGooglePopup: () => Promise<void>;
}

type AuthContextPropType = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextPropType) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                }

                setUser({
                    uid: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGooglePopup() {
        const provider = new firebase.auth.GoogleAuthProvider();
        

        const result = await auth.signInWithPopup(provider)
        console.log(result)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            console.log(result.user);
            setUser({
                uid: uid,
                name: displayName,
                avatar: photoURL
            })
        }

    }
    return (
        <AuthContext.Provider value={{ user, signInWithGooglePopup }}>
            {props.children}
        </AuthContext.Provider>
    );
}