"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  picture?: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", text: "signin_with" }
      );
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { token: response.credential }
      );
      setUser(res.data.user);
    } catch (err: any) {
      console.error(err);
      setError("Authentication failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    (window as any).google.accounts.id.disableAutoSelect();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Mubago</h1>

      {!user && (
        <>
          <div id="googleSignInDiv" className="mb-4"></div>
          <p className="text-gray-500">Sign in with your Google account</p>
        </>
      )}

      {user && (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          {user.picture && (
            <img
              src={user.picture}
              alt="profile"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
          )}
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}