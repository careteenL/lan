import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useContext,
	useMemo,
} from "react";

const Context = createContext({});

interface StateType {
  [key: string]: {
    id: React.ReactText;
    children: any;
  };
}

export function AliveScope(props: { children: React.ReactNode; }) {
	const [state, setState] = useState<StateType>({});
	const ref: any = useMemo(() => {
		return {};
	}, []);
	const keep = useMemo(() => {
		return (id: React.ReactText, children: any) =>
			new Promise((resolve) => {
				setState({
					[id]: { id, children },
				});
				setTimeout(() => {
					// 需要等待setState渲染完拿到实例返回给子组件。
					resolve(ref[id]);
				});
			});
	}, [ref]);
	return (
		<Context.Provider value={keep}>
			{props.children}
			{Object.values(state).map(({ id, children }) => (
				<div
					key={id}
					ref={(node) => {
						ref[id] = node;
					}}
				>
					{children}
				</div>
			))}
		</Context.Provider>
	);
}

function KeepAlive(props: { id: any; children: any; }) {
  const keep = useContext(Context) as Function;
  const ref: any = useRef(null);
	useEffect(() => {
		const init = async ({ id, children }: StateType['']) => {
			const realContent = await keep(id, children);
			if (ref.current && ref.current?.appendChild) {
				ref.current.appendChild(realContent);
			}
		};
		init(props);
	}, [props, keep]);
	return <div ref={ref} />;
}

export default KeepAlive;
