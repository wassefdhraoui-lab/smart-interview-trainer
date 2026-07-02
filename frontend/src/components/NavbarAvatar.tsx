"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";

const avatars = [
  "astronaut.png",
  "character.png",
  "hacker.png",
  "woman.png",
];

export default function NavbarAvatar() {
  const { user, updateAvatar } = useUser();
  const [open, setOpen] = useState(false);

  async function changeAvatar(avatar: string) {
    await updateAvatar(avatar);
    
  }

  const currentAvatar = user?.avatar || avatars[0];

  return (
    <div
      className="relative z-[9999]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6EBF2] bg-white shadow-sm"
      >
        <img
          src={`/${currentAvatar}`}
          alt="Avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-[9999] w-[320px] rounded-2xl border border-[#E6EBF2] bg-white shadow-2xl">
          <div className="border-b border-[#E6EBF2] px-4 py-3">
            <h3 className="font-bold text-[#0F172A]">Choose your avatar</h3>
            <p className="mt-1 text-xs text-[#64748B]">
              Click an avatar to apply it instantly.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 p-4">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => changeAvatar(avatar)}
                className={`rounded-xl p-2 transition hover:bg-[#EFF6FF] ${
                  currentAvatar === avatar
                    ? "bg-[#EFF6FF] ring-2 ring-[#2563EB]"
                    : "bg-white"
                }`}
              >
                <img
                  src={`/${avatar}`}
                  alt={avatar}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}