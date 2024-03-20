"use client";
import React from "react";

import { InventoryTable } from "@/components/modules/inventory";
import PageTitle from "@/components/PageTitle";
import AuthForm from "@/components/auth/AuthForm";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <AuthForm />
    </div>
  );
}
