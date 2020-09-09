import React from "react";
import { Button } from "../..";
import  {
	createMessage,
} from "./index";
import {
	withKnobs,
} from "@storybook/addon-knobs";

export default {
	title: "Display/Message",
	component: createMessage,
	decorators: [withKnobs],
};

export const knobsMessage = () => (
	<div>
		<Button onClick={() => createMessage()("Careteen")}>click</Button>
		<Button onClick={() => createMessage()("Lan")}>click</Button>
	</div>
);