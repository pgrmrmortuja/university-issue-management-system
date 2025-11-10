import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const userDelete = () => {
        setLoading(true);
        return deleteUser(auth.currentUser);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
        });
    }


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         console.log('current user', currentUser);

    //         if (currentUser) {
    //             const email = currentUser.email;
    //             axiosPublic.post('/login', { email })
    //                 .then(response => {
    //                     console.log("JWT Response:", response.data);
    //                     localStorage.setItem('jwt', response.data.token);
    //                     setLoading(false); // ✅ এখানে যোগ করো
    //                 })
    //                 .catch(error => {
    //                     console.error("JWT creation failed:", error);
    //                     setLoading(false); // ✅ এরর হলেও লোডিং বন্ধ করো
    //                 });
    //         } else {
    //             localStorage.removeItem('jwt');
    //             setLoading(false);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, [axiosPublic]);



    // Helper to request JWT from the server and store it
    const getJwt = async (email) => {
        try {
            const res = await axios.post("https://university-issue-management-system.vercel.app/login", { email });
            if (res?.data?.token) {
                localStorage.setItem("jwt", res.data.token);
            }
            return res.data;
        } catch (err) {
            console.error("JWT creation failed:", err);
            localStorage.removeItem("jwt");
            throw err; // caller can catch if desired
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Current user:", currentUser);
            // IMPORTANT: do NOT call getJwt here unconditionally.
            // We'll call getJwt from signup/login flows AFTER we ensure DB has the user.
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
        userDelete,
        getJwt
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;