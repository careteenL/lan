import React from "react";
import { GlobalStyle } from "../src/components/shared/global";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

addParameters({
	options: {
		showRoots: true,
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true,
	},
});
addDecorator(withA11y);
addDecorator((story) => (
	<>
		<GlobalStyle />
		{story()}
	</>
));
const loaderFn = () => {
	return [
		require("../src/Welcome.stories.mdx"),
		require("../src/Colors.stories.mdx"),
		require("../src/Typography.stories.mdx"),
	]
};
configure(loaderFn, module);
