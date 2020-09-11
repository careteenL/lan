import React from 'react';
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import { Table, SourceDataType } from './index';

export default {
  title: "Display/Table",
  component: Table,
  decorators: [withKnobs],
};


// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Chinese Score",
//     dataIndex: "chinese",
//   },
//   {
//     title: "Math Score",
//     dataIndex: "math",
//   },
//   {
//     title: "English Score",
//     dataIndex: "english",
//   },
// ];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     chinese: 55,
//     math: 60,
//     english: 70,
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     chinese: 98,
//     math: 66,
//     english: 89,
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     chinese: 78,
//     math: 90,
//     english: 70,
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     chinese: 88,
//     math: 99,
//     english: 89,
//   },
// ];

// export const basicPagination = () => <Pagination defaultCurrent={11}></Pagination>;

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
export const knobsTable = () => (
  <Table
    columns={columns}
    data={data}
    sorted={boolean("sorted", true)}
    pagination={boolean("pagination", true)}
    pageSize={number("pageSize", 2)}
  ></Table>
);

export const basicTable = () => (
  <Table
    columns={columns}
    data={data}
  ></Table>
);

export const withPagination = () => (
  <Table columns={columns} data={data} pagination={true} pageSize={2}></Table>
);

