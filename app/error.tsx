/** 定义全局错误界面ui，如果应用程序运行过程发生了某些错误，会展示此ui */

"use client"; // 错误组件必须是客户端组件
// dashboard/error.js
import { useEffect } from "react";

export default function Error({ error, reset }: any) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>非常抱歉，当前页面出现了些意外错误!</h2>
      <button
        onClick={
          // 尝试恢复
          () => reset()
        }
      >
        点击重新试试
      </button>
    </div>
  );
}
