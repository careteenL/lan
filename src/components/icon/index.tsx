import React from "react";
import styled from "styled-components";

import { icons } from "../shared/icons";

const Svg = styled.svg<IconProps>`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;

const Path = styled.path`
  fill: ${(props) => props.color};
`;

export interface IconProps {
  /** 图标名*/
  icon: keyof typeof icons;
  /** 是否块级元素 */
  block?: boolean;
  /** 颜色 */
  color?: string;
}

export function Icon(props: IconProps) {
  const { block, icon, color } = props;
  return (
    <Svg
      viewBox="0 0 1024 1024"
      width="20px"
      height="20px"
      block={block}
      {...props}
    >
      <Path d={icons[icon]} color={color} />
    </Svg>
  );
}
Icon.defaultProps = {
  block: false,
  color: "black",
};

export default Icon;
