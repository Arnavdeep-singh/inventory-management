import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient.ts';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null | undefined;
    signUpNewUser: (params: { username: string; email: string; password: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
    signInUser: (params: { username: string; password: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
    signOutUser: () => Promise<{ success: boolean; error?: string } | void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    // Sign up
    const signUpNewUser = async ({ username, email, password }: { username: string, email: string, password: string }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password: password,
                options: {
                    data: {
                        username: username,
                    }
                }
            });
            if (error) throw error;

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        username: username.toLowerCase(),
                        email: email.toLowerCase(),
                    });
                
                if (profileError) {
                    console.error('Error creating profile:', profileError.message);
                }
            }

            return {success: true, data};
        } catch (error) {
            console.error('Error signing up:', (error as Error).message);
            return {success: false, error: (error as Error).message};
        }
    };

    const signInUser = async ({ username, password }: { username: string, password: string }) => {
        try {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('email')
                .ilike('username', username)
                .single();
            
            console.log("PROFILE DATA:", profileData);
            console.log("PROFILE ERROR:", profileError);

            if (profileError) {
                console.error('Profile lookup error:', profileError.message);
                throw new Error('User not found');
            }

            if (!profileData) {
                throw new Error('User not found');
            }

            const { data, error } = await supabase.auth.signInWithPassword({   
                email: profileData.email,
                password: password,
            });
            if (error) throw error;
            console.log("Sign in success", data);
            return {success: true, data};
        } catch (error) {
            console.error('Error signing in:', (error as Error).message);
            return {success: false, error: (error as Error).message};
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
            setSession(session);
        });
    }, []);

    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', (error as Error).message);
            return {success: false, error: (error as Error).message};
        }
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}