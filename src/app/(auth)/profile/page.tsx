import React from "react";

import { Profile } from "@/components/modules/settings/profile";
import { AuthContextProvider } from "@/context/AuthContext";

type Props = {};

export default function ProfilePage({}: Props) {
  return (
    <AuthContextProvider>
      <div className="flex flex-col gap-5  w-full">
        <Profile />
      </div>
    </AuthContextProvider>
  );
}
