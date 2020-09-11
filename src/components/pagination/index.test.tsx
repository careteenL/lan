
import React from "react";
import { render, } from "@testing-library/react";
import { Pagination } from "./index";

describe("test Pagination component", () => {
  it('render correctly', () => {
    const wrapper = render(
      <Pagination
      >
      </Pagination>

    );
    expect(wrapper).toMatchSnapshot();
  });
})