import React from "react";
import { Progress } from "./index";
import {
  withKnobs, number, boolean, color, text,
} from "@storybook/addon-knobs";
import { Icon } from "../icon";

export default {
  title: "Display/Progress",
  component: Progress,
  decorators: [withKnobs],
};

export const knobsProgress = () => (
  <Progress
    count={number("count", 50, { range: true, min: 0, max: 100, step: 1 })}
    countNumber={boolean("countNumber", true)}
    height={number("height", 8)}
    circle={boolean("circle", false)}
    size={number("size", 100)}
    primary={color("primary", "#E43")}
    secondary={color("secondary", "#E44")}
    bottomColor={color("bottomColor", "#f5f5f5")}
    flashColor={color("flashColor", "#FFFFFF")}
    progressText={text("progressText", "")}
  ></Progress>
);

export const circle = () => <Progress count={20} circle={true}></Progress>;

export const progressText = () => (
  <Progress count={11} progressText="careteen" />
)

export const changeColor = () => (
  <Progress
    count={20}
    primary="blue"
    secondary="yellow"
    bottomColor="brown"
  />
)

export const withIcon = () => (
  <Progress
    count={11}
    progressText={
      <span>
        <Icon icon="admin" />
      </span>
    }
  />
)
