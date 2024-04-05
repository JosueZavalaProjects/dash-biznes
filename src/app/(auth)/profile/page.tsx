import React from "react";

import { Profile } from "@/components/modules/settings/profile";

type Props = {};

export default function ProfilePage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <Profile />
    </div>
  );
}
