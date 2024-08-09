/**使用到useState等，只能是客户端组件 */

"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <Link href="/template-test/about">
          <span className=" cursor-pointer text-cyan-500">About页面</span>
        </Link>
        <br />
        <Link href="/template-test/settings">
          <span className="cursor-pointer text-cyan-500">Settings页面</span>
        </Link>
      </div>
      <h1>Layout {count}</h1>
      <button onClick={() => setCount(count + 1)}>add layout count</button>
      {children}
    </>
  );
}
