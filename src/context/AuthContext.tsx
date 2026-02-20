import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUpNewUser = async ({username, email, password}) => {
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

            // Insert username -> email mapping into profiles table
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
                    // Don't throw, as the user was created successfully
                }
            }

            return {success: true, data};
        } catch (error) {
            console.error('Error signing up:', error.message);
            return {success: false, error: error.message};
        }
    };

    const signInUser = async ({username, password}) => {
        try {
            // Query the user by username from the profiles table (case-insensitive)
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
            console.error('Error signing in:', error.message);
            return {success: false, error: error.message};
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


    // Sign out
    const signOutUser = async () => {
        try {
            const { error } = supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error.message);
            return {success: false, error: error.message};
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