"use client";

import { useState } from "react";

type Props = {};

import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
  GanttChartSquare,
} from "lucide-react";

import { useWindowWidth } from "@react-hook/window-size";

import { AddModal } from "../modals/AddModal";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

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
              icon: GanttChartSquare,
              variant: "ghost",
            },
            {
              title: "Agregar",
              href: "#",
              icon: PlusCircle,
              variant: "ghost",
              onClick: () => setShowAddModal(true),
            },
          ]}
        />
      </div>
    </>
  );
}
