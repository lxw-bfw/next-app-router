"use client";

import { FC, ReactNode } from "react";

// 这里专门封装交互等需求的组件逻辑

interface ClickWrapProps {
  children: ReactNode;
  //   handleClick?: () => void;
}

const ClickWrap: FC<ClickWrapProps> = ({ children }) => {
  const handleError = () => {
    // 这里面抛出的错误，没有被被捕获并且线是error.js页面
    console.log("抛出错误~");
  };

  // 单纯给children绑定点击事件，不能影响到children原有的样式比如我的children是span，这里直接使用div包裹显然不行的
  return <div onClick={handleError}>{children}</div>;
};

export { ClickWrap };
