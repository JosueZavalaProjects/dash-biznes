import React from "react";

import { Subscription } from "@/components/modules/settings/subscription";

type Props = {};

export default function SubscriptionPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <Subscription />
    </div>
  );
}
