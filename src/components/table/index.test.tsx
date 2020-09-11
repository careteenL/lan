
import React from "react";
import { render, } from "@testing-library/react";
import { Table, SourceDataType } from "./index";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: {
      compare: (a: SourceDataType, b: SourceDataType) =>
        b.chinese - a.chinese,
    },
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: {
      compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a: SourceDataType, b: SourceDataType) =>
        b.english - a.english,
    },
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    chinese: 55,
    math: 60,
    english: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 78,
    math: 90,
    english: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
];
describe("test Table component", () => {
  it('render correctly', () => {
    const wrapper = render(
      <Table
        columns={columns}
        data={data}
      ></Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
})