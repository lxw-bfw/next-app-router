// dashboard控制面板相关页面共享的Layout布局

import type { Metadata } from "next";
import { ReactNode } from "react";

// 任意Layout都可以配置metadata进行导出，实现动态和补充元数据

export const metadata: Metadata = {
  title: "加载界面ui演示",
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className=" w-full h-full overflow-hidden flex justify-start">
      <div className="w-32 h-full flex justify-center items-center bg-black  text-white">
        加载界面ui演示
      </div>
      <div className=" flex-1 h-full">{children}</div>
    </div>
  );
}
