
import React from "react";
import { render, } from "@testing-library/react";
import { Tree } from "./index";

const source = [
  {
    value: "北京分行",
    children: [
      {
        value: "朝阳支行办事处",
        children: [
          { value: "朝阳支行办事处-1" },
          { value: "朝阳支行办事处-2" },
        ],
      },
      { value: "海淀支行办事处" },
      { value: "石景山支行办事处" },
    ],
  },
  {
    value: "天津分行",
    children: [
      { value: "和平支行办事处" },
      { value: "河东支行办事处" },
      { value: "南开支行办事处" },
    ],
  },
];

describe("test Tree component", () => {
  it('render correctly', () => {
    const wrapper = render(
      <Tree
        source={source}
      ></Tree>
    );
    expect(wrapper).toMatchSnapshot();
  });
})