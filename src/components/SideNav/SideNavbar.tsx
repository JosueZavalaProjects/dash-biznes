"use client";

import { useContext, useState } from "react";
import { MdOutlineInventory } from "react-icons/md";

import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { useWindowWidth } from "@react-hook/window-size";

import { AddModal } from "../modals/AddModal";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const handleLogOut = async () => {
    try {
      await authCtx.logout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

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
            /*   {
              title: "LogIn",
              href: "#",
              icon: PlusCircle,
              variant: "ghost",
              onClick: () => handleSignIn(),
            },
            */
            {
              title: "LogOut",
              href: "#",
              icon: MinusCircle,
              variant: "ghost",
              onClick: () => handleLogOut(),
            },
          ]}
        />
      </div>
    </>
  );
}
