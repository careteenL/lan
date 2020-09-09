import React from "react";
import { render } from "@testing-library/react";
import { Modal } from "./index";

describe("test Modal component", () => {

  it("should render text", () => {
    const wrapper = render(
      <Modal
        visible={true}
        parentSetState={() => {}}
      ></Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
