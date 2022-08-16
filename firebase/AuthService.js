import { auth } from "./firebase-config";

export const AuthService = {
    createUserWithEmailAndPassword: async (email, password) => {
        try {
            const userCred = await auth().createUserWithEmailAndPassword(email, password);
            await userCred.user.sendEmailVerification({url: "http://localhost:3000/login"});
            return {
                user: userCred.user,
            };
        } catch (e) {
            return {
                error: e.message
            }
        }
    },
    signInUserWithEmailAndPassword: async (email, password) => {
        try {
            const userCred = await auth().signInUserWithEmailAndPassword(email, password);
            return {
                user: userCred.user,
            };
        } catch (e) {
            return {
                error: e.message
            }
        }
    },
    logout: async () => {
        await auth().signOut();
    },
    resetPassword: async (email) => {
        try {
            await auth().sendPasswordResetEmail(email, {url: "http://localhost:3000/login"});
        } catch (e) {
            return {
                error: e.message
            }
        }
    },
    deleteAccount: async () => {
        try {
            auth().currentUser.delete();
        } catch (e) {
            return {
                error: e.message
            }
        }
    },
    updatePassword: async (newPassword) => {
        try {
            auth().currentUser.updatePassword(newPassword);
        } catch (e) {
            return {
                error: e.message
            }
        }
    },
}