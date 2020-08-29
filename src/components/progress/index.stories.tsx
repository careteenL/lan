import React from "react";
import { Progress } from "./index";
import {
  withKnobs,
} from "@storybook/addon-knobs";

export default {
  title: "Display/Progress",
  component: Progress,
  decorators: [withKnobs],
};

export const knobsProgress = () => <Progress count={20}></Progress>;

export const test = () => <Progress count={20} cicrle={true}></Progress>;
