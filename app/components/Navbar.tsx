"use client";
import React from "react";
import ScreenCard from "../utils/ScreenCard";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDropDown from "./ProfileDropDown";

function Navbar() {
  return (
    <div className="bg-mainColor h-[60px] items-center flex px-[10px] select-none">
      <ScreenCard>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl flex items-center font-bold uppercase text-mainLite hover:text-mainLite"
          >
            al ahbaab.
          </Link>
          <ProfileDropDown dropItems={[{ name: "Profile", url: "/profile" }]}>
            <Avatar className="h-8 w-8 shadow-bsh53" onClick={() => {}}>
              <AvatarImage src="https://pos.alahbaab.com/assets/ahmed-Cza6eXVN.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ProfileDropDown>
        </div>
      </ScreenCard>
    </div>
  );
}

export default Navbar;
