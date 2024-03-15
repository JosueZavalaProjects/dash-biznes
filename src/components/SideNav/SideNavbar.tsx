"use client";

import { useState } from "react";

type Props = {};

import { MdOutlineInventory } from "react-icons/md";

import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
} from "lucide-react";

import { UserAuth } from "@/context/AuthContext";
import { useWindowWidth } from "@react-hook/window-size";

import { AddModal } from "../modals/AddModal";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";

export default function SideNavbar({}: Props) {
  const { user, googleSignIn, logOut } = UserAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <>
      <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 hidden sm:flex">
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
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Invetario",
              href: "/inventory",
              icon: UsersRound,
              variant: "ghost",
            },
            {
              title: "Actividades",
              href: "/activities",
              icon: MdOutlineInventory,
              variant: "ghost",
            },
            {
              title: "Agregar",
              href: "#",
              icon: PlusCircle,
              variant: "ghost",
              onClick: () => setShowAddModal(true),
            },
            {
              title: "LogIn",
              href: "#",
              icon: PlusCircle,
              variant: "ghost",
              onClick: () => handleSignIn(),
            },
            {
              title: "LogOut",
              href: "#",
              icon: PlusCircle,
              variant: "ghost",
              onClick: () => handleLogOut(),
            },
          ]}
        />
      </div>
    </>
  );
}
