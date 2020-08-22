import React, { PropsWithChildren, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import styled from 'styled-components';

import { color } from '../shared/styles';

require("prismjs/components/prism-typescript");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-json");
require("prismjs/components/prism-css");

export type languagesType = "javascript" | "typescript" | "json" | "css";

const HighlightBlock = styled.div`
	.token.cdata,
	.token.comment,
	.token.doctype,
	.token.prolog {
		color: #708090;
	}
	.token.punctuation {
		color: #999;
	}
	.namespace {
		opacity: 0.7;
	}
	.token.boolean,
	.token.constant,
	.token.deleted,
	.token.number,
	.token.property,
	.token.symbol,
	.token.tag {
		color: #905;
	}
	.token.attr-name,
	.token.builtin,
	.token.char,
	.token.inserted,
	.token.selector,
	.token.string {
		color: #690;
	}
	.language-css .token.string,
	.style .token.string,
	.token.entity,
	.token.operator,
	.token.url {
		color: #a67f59;
		background: hsla(0, 0%, 100%, 0.5);
	}
	.token.atrule,
	.token.attr-value,
	.token.keyword {
		color: #07a;
	}
	.token.class-name,
	.token.function {
		color: #dd4a68;
	}
	.token.important,
	.token.regex,
	.token.variable {
		color: #e90;
	}
	.token.bold,
	.token.important {
		font-weight: 700;
	}
	.token.italic {
		font-style: italic;
	}
	.token.entity {
		cursor: help;
	}

	code,
	pre {
		color: ${color.darkest};
	}

	code {
		white-space: pre;
	}

	pre {
		padding: 11px 1rem;
		margin: 1rem 0;
		background: ${color.lighter};
		overflow: auto;
	}

	.language-bash .token.operator,
	.language-bash .token.function,
	.language-bash .token.builtin {
		color: ${color.darkest};
		background: none;
	}
`;

export type HighlightProps = {
	language?: languagesType;
};

const htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

function escape(string: string) {
	return string && reHasUnescapedHtml.test(string)
		? string.replace(
				reUnescapedHtml,
				(chr: string) => htmlEscapes[chr as keyof typeof htmlEscapes]
		  )
		: string || "";
}

export function Highlight(props: PropsWithChildren<HighlightProps>) {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { children, language } = props;
	const codeBlock = (
		<div dangerouslySetInnerHTML={{ __html: escape(children + "") }} />
	);
	useEffect(() => {
		if (nodeRef.current) {
			Prism.highlightAllUnder(nodeRef.current);
		}
	}, [nodeRef]);
	return (
		<HighlightBlock ref={nodeRef}>
			<pre className={`language-${language}`}>
				<code className={`language-${language}`}>{codeBlock}</code>
			</pre>
		</HighlightBlock>
	);
}

export default Highlight;
