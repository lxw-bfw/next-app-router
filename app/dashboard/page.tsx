import { ClickWrap } from "./interaction";

export default function Page() {
  return (
    <div className=" w-full h-full  flex justify-center items-center flex-col">
      <h1>
        hello,the page path is <code>/dashboard</code>
      </h1>
      <div>
        <ClickWrap>
          {/* 静态样式，ClickWrap可以当作一个高阶组件，用以提供当前页面此部分ui的交互逻辑和状态更新 */}
          <button className=" bg-slate-500 text-white p-2 rounded-md hover:bg-slate-800">
            抛出一个错误
          </button>
        </ClickWrap>
      </div>
    </div>
  );
}
