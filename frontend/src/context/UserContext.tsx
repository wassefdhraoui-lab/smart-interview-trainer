"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

type UserContextType = {
  user: User | null;
  loadUser: () => Promise<void>;
  updateAvatar: (avatar: string) => Promise<void>;
  updateAccount: (
  name: string,
  email: string,
  currentPassword: string,
  newPassword: string
) => Promise<any>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function loadUser() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    const response = await fetch(`http://localhost:5000/users/me?userId=${userId}`);
    const data = await response.json();

    if (data.success) {
      setUser(data.user);
    }
  }


async function updateAccount(
  name: string,
  email: string,
  currentPassword: string,
  newPassword: string
) {
  const userId = localStorage.getItem("userId");

  const response = await fetch("http://localhost:5000/users/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      name,
      email,
      currentPassword,
      newPassword,
    }),
  });

  const text = await response.text();

  if (!text) {
    return {
      success: false,
      message: "Backend returned empty response",
    };
  }

  const data = JSON.parse(text);

  if (data.success) {
    setUser(data.user);
  }

  return data;
}
  async function updateAvatar(avatar: string) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    const response = await fetch("http://localhost:5000/users/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        avatar: avatar,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setUser(data.user);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadUser, updateAvatar, updateAccount }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}