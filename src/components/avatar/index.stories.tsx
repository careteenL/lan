import React from "react";
import { Avatar, AvatarSize } from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: "Display/Avatar",
  component: Avatar,
  decorators: [withKnobs],
};
type AvatarSizeType = keyof typeof AvatarSize;

export const knobsAvatar = () => (
  <Avatar
    size={select<AvatarSizeType>(
      "size",
      Object.keys(AvatarSize) as AvatarSizeType[],
      "medium"
    )}
    username={text("username", "careteen")}
    src={text(
      "src",
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    )}
    isLoading={boolean("isLoading", false)}
  />
);

export const large = () => (
  <div>
    <Avatar isLoading size="large" />
    <Avatar size="large" username="careteen" />
    <Avatar
      size="large"
      username="careteen"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    />
  </div>
);

export const medium = () => (
  <div>
    <Avatar isLoading />
    <Avatar username="中文" />
    <Avatar
      username="careteen"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    />
  </div>
);

export const small = () => (
  <div>
    <Avatar isLoading size="small" />
    <Avatar size="small" username="careteen" />
    <Avatar
      size="small"
      username="careteen"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    />
  </div>
);

export const tiny = () => (
  <div>
    <Avatar isLoading size="tiny" />
    <Avatar size="tiny" username="careteen" />
    <Avatar
      size="tiny"
      username="careteen"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    />
  </div>
);
