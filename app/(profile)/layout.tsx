import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "个人中心",
};

export default function ProfileLaout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className=" w-full h-full overflow-hidden flex justify-start">
      <div className="w-32 h-full flex justify-center items-center bg-black  text-white">
        个人中心面板
      </div>
      <div className=" flex-1 h-full">{children}</div>
    </div>
  );
}
