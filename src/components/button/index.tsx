import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

import styled from 'styled-components';

const LanButton = styled.button({
	color: 'red',
})

console.log(styled, styled.button)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: PropsWithChildren<ButtonProps>) {
	const { children, ...rest } = props;
	return <LanButton {...rest}>{children}</LanButton>;
}
export default Button;
