"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  type User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

type MembershipStatus = "free" | "active" | "cancelled";

type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "member" | "admin";
  membershipStatus: MembershipStatus;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;

  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function createOrUpdateUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "member",
      membershipStatus: "free",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return;
  }

  await updateDoc(userRef, {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    updatedAt: serverTimestamp(),
  });
}

async function getUserProfile(uid: string) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data() as UserProfile;
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setProfile(null);
          return;
        }

        await createOrUpdateUserProfile(firebaseUser);

        const userProfile = await getUserProfile(firebaseUser.uid);

        setUser(firebaseUser);
        setProfile(userProfile);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function signUp(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createOrUpdateUserProfile(credential.user);
  }

  async function signIn(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createOrUpdateUserProfile(credential.user);
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const credential = await signInWithPopup(auth, provider);

    await createOrUpdateUserProfile(credential.user);
  }

  async function logOut() {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}