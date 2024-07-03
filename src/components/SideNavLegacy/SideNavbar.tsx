"use client";

import { useContext, useEffect, useState } from "react";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { useWindowWidth } from "@react-hook/window-size";

import { AddModal } from "../modals/AddModal";
import { Navbar } from "../NavBar";
import { Button } from "../ui/buttons/button";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 1345;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    if (onlyWidth < 1345) setIsCollapsed(true);
  }, [onlyWidth]);

  return (
    <>
      <div
        className={`relative h-screen border-r border-b hidden sm:flex rounded-b-3xl ${
          isCollapsed ? "px-4 py-12" : "px-8 py-16"
        }`}
      >
        {!mobileWidth && (
          <div className="absolute right-[-20px] top-7">
            <Button
              onClick={toggleSidebar}
              variant="secondary"
              className=" rounded-full p-2"
            >
              {isCollapsed && <ChevronRight />}
              {!isCollapsed && <ChevronLeft />}
            </Button>
          </div>
        )}
        <AddModal show={showAddModal} setShow={setShowAddModal} />

        <Navbar isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
