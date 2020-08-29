import React, {
  PropsWithChildren,
  ReactNode,
  ReactElement,
  TouchEvent,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import styled from "styled-components";
import Radio from "../radio";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from "../shared/animation";

interface AnimationType {
  animatein: boolean;
  direction: "" | "left" | "right";
}

interface TransitionType extends AnimationType {
  delay: number;
  width: number;
}

interface WrapperProps {
  viewportBoxshadow?: string;
}

const Wrapper = styled.div<WrapperProps>`
  box-shadow: ${(props) => props.viewportBoxshadow};
  padding: 10px;
  border-radius: 5px;
`;

const Transition = styled.div<TransitionType>`
  ${(props) =>
    !props.animatein &&
    props.direction === "left" &&
    `
    transform: translateX(${props.width}px);
    `}
  ${(props) =>
    !props.animatein &&
    props.direction === "right" &&
    `
    transform: translateX(${-props.width}px);
    `}
  ${(props) =>
    props.animatein &&
    props.direction === "left" &&
    `
    transform: translateX(0);
      transition: all ${props.delay / 1000}s ease;
    `}
  ${(props) =>
    props.animatein &&
    props.direction === "right" &&
    `
    transform: translateX(0);
    transition: all ${props.delay / 1000}s ease;
    `}
`;

type CarouselProps = WrapperProps & {
  /** 默认索引*/
  defaultIndex?: number;
  /** 轮播图高度 */
  height?: number;
  /** 是否自动播放 */
  autoplay: boolean;
  /** 自动播放延迟 */
  autoplayDelay?: number;
  /** 翻页动画延迟 */
  delay?: number;
  /**  动画速度 1000是1秒 */
  animationDelay?: number;
  /**自动播放时是否反向播放 */
  autoplayReverse?: boolean;
  /** radio color */
  radioAppear?: keyof typeof color;
  /** 手势滑动距离差值 */
  touchDiff: number;
}

function currentSetMap(
  current: number,
  map: [number, number, number]
): [number, number, number] {
  let mid = map[1];
  if (mid === current) {
    return map;
  } else if (mid < current) {
    return [mid, current, -1];
  } else {
    return [-1, current, mid];
  }
}

function mapToState(
  map: [number, number, number],
  children: ReactNode,
  totalLen: number
) {
  if (totalLen <= 1) {
    return [null, children, null];
  } else {
    return map.map((v) => {
      if (v === -1) {
        return null;
      } else {
        let child = children as ReactElement[];
        return child[v];
      }
    });
  }
}

function toMove(
  right: boolean,
  totalLen: number,
  indexMap: [number, number, number],
  setIndexMap: React.Dispatch<React.SetStateAction<[number, number, number]>>
) {
  let y;
  if (right) {
    if (indexMap[1] < totalLen - 1) {
      y = indexMap[1] + 1;
    } else {
      y = 0;
    }
  } else {
    if (indexMap[1] === 0) {
      y = totalLen - 1;
    } else {
      y = indexMap[1] - 1;
    }
  }
  setIndexMap(currentSetMap(y, indexMap));
}

export function Carousel(props: PropsWithChildren<CarouselProps>) {
  const {
    viewportBoxshadow,
    defaultIndex,
    height,
    children,
    autoplay,
    autoplayDelay,
    delay,
    animationDelay,
    autoplayReverse,
    radioAppear,
    touchDiff,
    ...rest
   } = props;
  //设置需要展示的元素
  const [state, setState] = useState<ReactNode[]>([]);
  //设置显示索引用
  const [indexMap, setIndexMap] = useState<[number, number, number]>([
    -1,
    -1,
    -1,
  ]);

  //控制方向进出用
  const [animation, setAnimation] = useState<AnimationType>({
    animatein: true,
    direction: "",
  });

  //设置宽度用
  const [bound, setBound] = useState<DOMRect>();
  const totalLen = useMemo(() => {
    let len: number;
    if (children instanceof Array) {
      len = children.length;
    } else {
      len = 1;
    }
    return len;
  }, [children]);

  // 设置touch
  const [start, setStart] = useState(0);
  const touchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStart(e.touches[0].clientX);
  };
  const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
    let end = e.changedTouches[0].clientX;
    let val = end - start;
    let abs = Math.abs(val);
    if (abs > touchDiff!) {
      //说明可以进一步判断
      if (val > 0) {
        //从左往右 向左翻
        toMove(false, totalLen, indexMap, setIndexMap);
      } else {
        toMove(true, totalLen, indexMap, setIndexMap);
      }
    }
  };

  useMemo(() => {
    let map: [number, number, number] = [-1, -1, -1];
    map[1] = defaultIndex!;
    let res = mapToState(map, children, totalLen);
    setState(res);
    setIndexMap(map);
  }, [defaultIndex, children, totalLen]);

  useEffect(() => {
    let child = children as ReactElement[];
    let timer: number;
    if (child) {
      let tmp = indexMap.map((v) => {
        return v !== -1 ? child[v] : null;
      });
      let sign: boolean;
      setState(tmp); //后setState会有补足问题必须先设

      if (indexMap[0] === -1 && indexMap[2] === -1) {
        //首轮
        return;
      } else if (indexMap[0] === -1) {
        sign = true;
        setAnimation({ animatein: false, direction: "right" });
      } else {
        sign = false;
        setAnimation({ animatein: false, direction: "left" });
      }
      timer = window.setTimeout(() => {
        if (sign) {
          setAnimation({ animatein: true, direction: "right" });
        } else {
          setAnimation({ animatein: true, direction: "left" });
        }
      }, delay!);
    }
    
    return () => window.clearTimeout(timer);
  }, [delay, indexMap, children]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setBoundFunc = () => {
      if (ref.current) {
        let bounds = ref.current.getBoundingClientRect();
        setBound(bounds);
      }
    };
    setBoundFunc();

    const resizefunc = () => {
      setBoundFunc();
    };
    window.addEventListener("resize", resizefunc);
    return () => {
      window.removeEventListener("resize", resizefunc);
    };
  }, []);

  useEffect(() => {
    let timer: number;
    if (autoplay) {
      timer = window.setTimeout(() => {
        toMove(!autoplayReverse!, totalLen, indexMap, setIndexMap);
      }, autoplayDelay);
    }
    return () => window.clearTimeout(timer);
  }, [autoplay, autoplayDelay, autoplayReverse, indexMap, totalLen]);

  return (
    <Wrapper
      ref={ref}
      viewportBoxshadow={viewportBoxshadow!}
      {...rest}
    >
      <div
        className="viewport"
        style={{
          width: `100%`,
          height: `${height!}px`,
          overflow: "hidden",
          position: "relative",
          boxShadow: viewportBoxshadow,
        }}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
        <Transition
          animatein={animation.animatein}
          direction={animation.direction}
          delay={animationDelay!}
          width={bound?.width!}
        >
          <div
            style={{
              display: "flex",
              width: `${bound?.width! * 3}px`,
              position: "absolute",
              left: `${-bound?.width!}px`,
            }}
          >
            {state.map((v, i) => (
              <div
                key={i}
                style={{
                  height: `${height!}px`,
                  width: `${bound?.width}px`,
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </Transition>
      </div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          new Array(totalLen).fill(1).map((x, y) => {
            return (
              <Radio
                label=""
                key={y}
                hideLabel
                appearance={radioAppear}
                value={0}
                checked={y === indexMap[1]}
                onChange={() => { }}
                onClick={() => {
                  let newmap = currentSetMap(y, indexMap);
                  setIndexMap(newmap);
                }}
              />
            );
          })
        }
      </ul>
    </Wrapper>
  );
}

Carousel.defaultProps = {
  defaultIndex: 0,
  delay: 100,
  height: 200,
  autoplay: true,
  autoplayDelay: 5000,
  animationDelay: 1000,
  touchDiff: 10,
};