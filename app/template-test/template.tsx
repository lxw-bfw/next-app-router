"use client";

import { ReactNode, useState } from "react";

export default function Template({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Template {count}</h1>
      <h3 className=" text-blue-600">
        template页面包裹了路由页面，但是路由页面相互切换的时候它不会根Layout以为维持状态，他会重新创建实例
      </h3>
      <button onClick={() => setCount(count + 1)}>add template count</button>
      {children}
    </>
  );
}
