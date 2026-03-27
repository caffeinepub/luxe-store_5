import { c as createLucideIcon, f as frame, a as cancelFrame, i as interpolate, b as isMotionValue, J as JSAnimation, p as progress, v as velocityPerSecond, d as isHTMLElement, e as defaultOffset$1, g as clamp, n as noop, r as resize, h as frameData, s as supportsScrollTimeline, u as useConstant, j as reactExports, k as useIsomorphicLayoutEffect, l as invariant, m as motionValue, M as MotionConfigContext, o as collectMotionValues, q as jsxRuntimeExports, t as motion, L as Link, w as useCart, x as useWishlist, z, A as AnimatePresence, H as Heart } from "./index-reN5OOSG.js";
import { u as useAllProducts } from "./useQueries-B07jg7Gf.js";
import { m as mockProducts, C as CATEGORY_LIST, g as getProductImage, t as testimonials, S as Star } from "./mockData-BYfJmjr3.js";
import { Z as Zap, u as useInView } from "./use-in-view-CSOtjOB4.js";
import { C as ChevronRight } from "./chevron-right-SV5CRGAJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
  };
  const startAnimation = () => {
    stopAnimation();
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      return;
    }
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity: value.getVelocity(),
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(() => {
      var _a;
      startAnimation();
      (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
      activeAnimation == null ? void 0 : activeAnimation.then(() => {
        var _a2;
        (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
      });
    });
  }, stopAnimation);
  if (isMotionValue(source)) {
    const removeSourceOnChange = source.on("change", (v) => value.set(parseValue(v, unit)));
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element[`scroll${position}`];
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber2 = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber2;
    } else if (edge.endsWith("%")) {
      edge = asNumber2 / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber2 / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber2 / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber2;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) == null ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
function canUseNativeTimeline(target) {
  return typeof window !== "undefined" && !target && supportsScrollTimeline();
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  const containerCache = timelineCache.get(container) ?? /* @__PURE__ */ new Map();
  timelineCache.set(container, containerCache);
  const targetKey = options.target ?? "self";
  const targetCache = containerCache.get(targetKey) ?? {};
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    targetCache[axisKey] = canUseNativeTimeline(options.target) ? new ScrollTimeline({ source: container, axis }) : scrollTimelineFallback({ container, ...options });
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  return animation.attachTimeline({
    timeline: options.target ? void 0 : timeline,
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container) {
  return {
    factory: (animation) => scroll(animation, { ...options, axis, container }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (!target && canUseNativeTimeline()) {
    const resolvedContainer = (container == null ? void 0 : container.current) || void 0;
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, resolvedContainer);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, resolvedContainer);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    });
    return () => {
      var _a;
      (_a = scrollAnimation.current) == null ? void 0 : _a.call(scrollAnimation);
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const outputRange = outputRangeOrMap;
  const transformer = transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { scaleX, transformOrigin: "left" },
      className: "fixed top-0 left-0 right-0 h-[2px] z-[9999]",
      "data-ocid": "scroll.progress",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full w-full",
          style: {
            background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)"
          }
        }
      )
    }
  );
}
const MARQUEE_TEXT = "LUXE STORE • PREMIUM QUALITY • FREE SHIPPING • NEW ARRIVALS • EXCLUSIVE DEALS • FLASH SALE • SHOP NOW • ";
const MARQUEE_WORDS = MARQUEE_TEXT.split(" ").filter(Boolean);
function MarqueeWordList() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: MARQUEE_WORDS.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-block text-xs font-bold uppercase tracking-[0.25em] mr-4",
      style: {
        color: i % 2 === 0 ? "rgba(0,255,255,0.9)" : "rgba(255,0,255,0.85)",
        textShadow: i % 2 === 0 ? "0 0 8px #00ffff" : "0 0 8px #ff00ff"
      },
      children: word
    },
    i
  )) });
}
function MarqueeStrip() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative overflow-hidden py-3",
      style: {
        background: "rgba(2,2,8,0.98)",
        borderTop: "1px solid rgba(0,255,255,0.35)",
        borderBottom: "1px solid rgba(0,255,255,0.35)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marquee-track whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeWordList, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeWordList, {})
      ] })
    }
  );
}
function AnimatedWordHeading({
  text,
  className
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isGlitching, setIsGlitching] = reactExports.useState(false);
  const words = text.split(" ");
  reactExports.useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 600);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h2",
    {
      ref,
      className: `${className ?? ""}${isGlitching ? " heading-glitch" : ""}`,
      "aria-label": text,
      children: words.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1]
          },
          className: "inline-block mr-[0.3em]",
          children: word
        },
        i
      ))
    }
  );
}
function CountdownTimer() {
  const endTime = reactExports.useRef(Date.now() + 24 * 60 * 60 * 1e3);
  const [timeLeft, setTimeLeft] = reactExports.useState({ h: 23, m: 59, s: 59 });
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime.current - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / 36e5),
        m: Math.floor(diff % 36e5 / 6e4),
        s: Math.floor(diff % 6e4 / 1e3)
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: ["h", "m", "s"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 glass-card rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 10, opacity: 0 },
        transition: { duration: 0.2 },
        className: "font-display text-2xl font-black text-luxe-cyan",
        children: String(timeLeft[label]).padStart(2, "0")
      },
      timeLeft[label]
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mt-1", children: label })
  ] }, label)) });
}
const SHOE_IMAGES = [
  "/assets/generated/hero-shoe-1.dim_600x600.jpg",
  "/assets/generated/hero-shoe-2.dim_600x600.jpg",
  "/assets/generated/hero-shoe-3.dim_600x600.jpg"
];
const MINI_CARDS = [
  {
    image: "/assets/generated/product-watch.dim_600x600.jpg",
    label: "Watch Pro",
    price: "$249",
    style: { top: "5%", right: "0%" },
    delay: 0
  },
  {
    image: "/assets/generated/product-beauty.dim_600x600.jpg",
    label: "Luxe Scent",
    price: "$89",
    style: { top: "42%", right: "-5%" },
    delay: 1.2
  },
  {
    image: "/assets/generated/product-headphones.dim_600x600.jpg",
    label: "AirPods Max",
    price: "$179",
    style: { bottom: "8%", right: "2%" },
    delay: 2.4
  }
];
if (typeof document !== "undefined" && !document.getElementById("shoe-glitch-style")) {
  const s = document.createElement("style");
  s.id = "shoe-glitch-style";
  s.textContent = `
    @keyframes shoeGlitch {
      0%   { transform: translate(0); filter: brightness(1) saturate(1); clip-path: inset(0 0 0 0); opacity: 1; }
      5%   { clip-path: inset(10% 0 80% 0); transform: translate(-8px, 0); filter: brightness(2) saturate(3) hue-rotate(90deg); opacity: 0.9; }
      10%  { clip-path: inset(60% 0 10% 0); transform: translate(8px, 0); filter: brightness(0.5) hue-rotate(-90deg); opacity: 1; }
      15%  { clip-path: inset(30% 0 50% 0); transform: translate(-5px, 3px) skewX(8deg); filter: brightness(1.8) hue-rotate(180deg); }
      20%  { clip-path: inset(0 0 0 0); transform: translate(6px, -3px) skewX(-6deg); filter: brightness(1.2) saturate(2); }
      25%  { clip-path: inset(45% 0 25% 0); transform: translate(-10px, 0); filter: brightness(2.5) hue-rotate(270deg); opacity: 0.7; }
      30%  { clip-path: inset(0 0 0 0); transform: translate(0); filter: brightness(1); opacity: 1; }
      35%  { clip-path: inset(70% 0 5% 0); transform: translate(4px, 0) skewX(3deg); filter: brightness(1.5) hue-rotate(45deg); }
      40%  { clip-path: inset(0 0 0 0); transform: translate(-3px, 1px); filter: brightness(0.9); }
      50%  { transform: translate(2px, -1px); filter: brightness(1.1); clip-path: inset(0 0 0 0); }
      60%  { transform: translate(-2px, 0); filter: brightness(1); }
      100% { transform: translate(0); filter: brightness(1) saturate(1); clip-path: inset(0 0 0 0); opacity: 1; }
    }
    @keyframes shoeGlitchOverlay {
      0%   { opacity: 0; }
      5%   { opacity: 0.6; background: rgba(0,255,255,0.3); }
      10%  { opacity: 0.4; background: rgba(255,0,255,0.3); }
      15%  { opacity: 0.7; background: rgba(0,255,255,0.2); }
      20%  { opacity: 0; }
      25%  { opacity: 0.5; background: rgba(255,0,255,0.25); }
      30%  { opacity: 0; }
      100% { opacity: 0; }
    }
    .shoe-glitch { animation: shoeGlitch 0.5s steps(1) forwards; }
    .shoe-glitch-overlay { animation: shoeGlitchOverlay 0.5s steps(1) forwards; }
  `;
  document.head.appendChild(s);
}
function HeroRightPanel() {
  const [activeShoe, setActiveShoe] = reactExports.useState(0);
  const [glitching, setGlitching] = reactExports.useState(false);
  const { theme } = z();
  const isDark = theme !== "light";
  reactExports.useEffect(() => {
    for (const src of SHOE_IMAGES) {
      const img = new Image();
      img.src = src;
    }
  }, []);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setActiveShoe((prev) => (prev + 1) % SHOE_IMAGES.length);
      }, 150);
      setTimeout(() => setGlitching(false), 550);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      className: "relative hidden lg:flex items-center justify-center",
      style: { width: "100%", height: 580 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute pointer-events-none",
            style: {
              width: 200,
              height: 200,
              top: "5%",
              left: "5%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,255,0.45) 0%, transparent 70%)",
              filter: "blur(20px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute pointer-events-none",
            style: {
              width: 150,
              height: 150,
              bottom: "10%",
              right: "8%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,0,255,0.45) 0%, transparent 70%)",
              filter: "blur(20px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(255,0,255,0.18) 40%, transparent 70%)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              width: 520,
              height: 520,
              borderRadius: "50%",
              border: "1.5px dashed rgba(0,255,255,0.6)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              animation: "spin 40s linear infinite",
              willChange: "transform"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              width: 400,
              height: 400,
              borderRadius: "50%",
              border: "1px dotted rgba(255,0,255,0.5)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              animation: "spin-reverse 28s linear infinite",
              willChange: "transform"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              zIndex: 10,
              animation: "float 5s ease-in-out infinite",
              willChange: "transform"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 340, height: 260 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "sync", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.img,
                  {
                    src: SHOE_IMAGES[activeShoe],
                    alt: "Featured Shoe",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.15 },
                    className: glitching ? "shoe-glitch" : "",
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 340,
                      height: 260,
                      objectFit: "cover",
                      borderRadius: 20,
                      willChange: "opacity, transform"
                    }
                  },
                  activeShoe
                ) }),
                glitching && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "shoe-glitch-overlay",
                    style: {
                      position: "absolute",
                      inset: 0,
                      borderRadius: 20,
                      pointerEvents: "none",
                      zIndex: 20,
                      willChange: "opacity"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: -14,
                    left: -10,
                    background: "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 10,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transform: "rotate(-2deg)",
                    boxShadow: "0 4px 18px rgba(168,85,247,0.6)",
                    zIndex: 20
                  },
                  children: "New Arrival"
                }
              )
            ]
          }
        ),
        MINI_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              ...card.style,
              zIndex: 15,
              animation: `float 5s ease-in-out ${card.delay}s infinite`,
              willChange: "transform"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  width: 112,
                  background: isDark ? "rgba(15,5,30,0.85)" : "rgba(255,255,255,0.9)",
                  border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  padding: 8
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: card.image,
                      alt: card.label,
                      style: {
                        width: "100%",
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 10
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: isDark ? "#e9d5ff" : "#1a0030",
                        fontWeight: 700,
                        fontSize: 11,
                        marginTop: 6,
                        textAlign: "center"
                      },
                      children: card.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: isDark ? "#d946ef" : "#9b059b",
                        fontWeight: 900,
                        fontSize: 12,
                        textAlign: "center"
                      },
                      children: card.price
                    }
                  )
                ]
              }
            )
          },
          card.label
        )),
        " "
      ]
    }
  );
}
function HeroSection() {
  const sectionRef = reactExports.useRef(null);
  const [heroGlitch, setHeroGlitch] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let timeoutId;
    const schedule = () => {
      const delay = 5e3 + Math.random() * 2e3;
      timeoutId = setTimeout(() => {
        setHeroGlitch(true);
        setTimeout(() => {
          setHeroGlitch(false);
          schedule();
        }, 400);
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "relative min-h-screen flex items-center overflow-hidden scanline-overlay",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: { background: "var(--hero-bg)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "radial-gradient(circle, rgba(0,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aurora-blob absolute",
            style: {
              width: 600,
              height: 600,
              top: "-10%",
              right: "-5%",
              background: "radial-gradient(ellipse, rgba(0,255,255,0.35) 0%, rgba(0,180,255,0.15) 50%, transparent 70%)",
              animationDelay: "0s",
              animationDuration: "14s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aurora-blob absolute",
            style: {
              width: 500,
              height: 500,
              bottom: "-5%",
              left: "-8%",
              background: "radial-gradient(ellipse, rgba(255,0,255,0.3) 0%, rgba(180,0,255,0.12) 50%, transparent 70%)",
              animationDelay: "-5s",
              animationDuration: "18s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -60 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    },
                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-luxe-cyan/40 text-luxe-cyan text-xs font-semibold uppercase tracking-widest mb-6",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "fill-luxe-cyan" }),
                      "New Collection 2026"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    className: `font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-foreground mb-6${heroGlitch ? " hero-glitch" : ""}`,
                    "aria-label": "DISCOVER PREMIUM PRODUCTS",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          initial: { opacity: 0, y: 40 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            delay: 0.3,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          },
                          style: { display: "block" },
                          children: "DISCOVER"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          className: "gradient-text",
                          initial: { opacity: 0, y: 40 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            delay: 0.45,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          },
                          style: { display: "block" },
                          children: "PREMIUM"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          initial: { opacity: 0, y: 40 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            delay: 0.6,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          },
                          style: { display: "block" },
                          children: "PRODUCTS"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.9, duration: 0.6 },
                    className: "text-muted-foreground text-lg leading-relaxed mb-8 max-w-md",
                    children: "Curated collections of elite products crafted for those who demand the extraordinary. Quality meets innovation."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 1.1, duration: 0.6 },
                    className: "flex flex-wrap gap-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          whileTap: { scale: 0.92 },
                          className: "btn-primary text-sm font-bold uppercase tracking-widest neon-pulse",
                          "data-ocid": "hero.primary_button",
                          children: "Shop Now"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          whileTap: { scale: 0.92 },
                          className: "btn-outline text-sm font-bold uppercase tracking-widest",
                          "data-ocid": "hero.secondary_button",
                          children: "Explore Collection"
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 1.4 },
                    className: "flex gap-8 mt-12 pt-8 border-t border-border/30",
                    children: [
                      ["50K+", "Happy Customers"],
                      ["500+", "Premium Products"],
                      ["4.9", "Star Rating"]
                    ].map(([num, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        whileHover: { scale: 1.1 },
                        transition: { type: "spring", stiffness: 400, damping: 15 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-black text-foreground", children: num }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
                        ]
                      },
                      label
                    ))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroRightPanel, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.5 },
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 6, 0] },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 16, className: "text-muted-foreground" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function CategoriesSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = reactExports.useRef(null);
  const scroll2 = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 4;
    scrollRef.current.scrollBy({
      left: dir === "right" ? cardWidth : -cardWidth,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "max-w-7xl mx-auto px-4 sm:px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Browse by Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedWordHeading,
              {
                text: "Featured Categories",
                className: "font-display text-4xl font-black uppercase text-foreground mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-[3px] w-40 rounded-full",
                style: {
                  background: "linear-gradient(90deg, #00ffff 0%, #ff00ff 60%, transparent 100%)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : {},
          transition: { delay: 0.3 },
          className: "flex gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                onClick: () => scroll2("left"),
                whileHover: { scale: 1.15 },
                whileTap: { scale: 0.85, rotate: -5 },
                transition: { type: "spring", stiffness: 400, damping: 15 },
                className: "p-3 rounded-full glass-card border border-border/50 hover:border-cyan-400/60 transition-all",
                "data-ocid": "categories.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                onClick: () => scroll2("right"),
                whileHover: { scale: 1.15 },
                whileTap: { scale: 0.85, rotate: 5 },
                transition: { type: "spring", stiffness: 400, damping: 15 },
                className: "p-3 rounded-full glass-card border border-border/50 hover:border-cyan-400/60 transition-all",
                "data-ocid": "categories.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-5 overflow-x-auto scrollbar-hide",
        style: {
          scrollbarWidth: "none",
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "12px",
          paddingRight: "12px",
          marginTop: "-20px",
          marginLeft: "-12px",
          marginRight: "-12px"
        },
        children: CATEGORY_LIST.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: {
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: i * 0.07
            },
            className: "flex-shrink-0 w-[calc(25%-15px)] min-w-[200px]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": `categories.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TiltCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                whileHover: { scale: 1.03, y: -6 },
                transition: { type: "spring", stiffness: 800, damping: 60 },
                className: "group relative rounded-2xl overflow-hidden cursor-pointer",
                style: { aspectRatio: "3/2" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: cat.image,
                      alt: cat.name,
                      className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      style: {
                        background: "linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.12) 50%, transparent 100%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none",
                      style: {
                        boxShadow: "inset 0 0 0 1.5px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.35)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-white uppercase tracking-[0.15em] text-base leading-tight", children: cat.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-2 h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16",
                        style: {
                          background: "linear-gradient(90deg, #00ffff, #ff00ff)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-semibold uppercase tracking-widest text-purple-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300", children: "Shop Now →" })
                  ] })
                ]
              }
            ) }) })
          },
          cat.name
        ))
      }
    )
  ] });
}
function TiltCard({ children }) {
  const ref = reactExports.useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    ref.current.style.transition = "transform 0.1s ease";
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    ref.current.style.transition = "transform 0.4s ease";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children
    }
  );
}
function TrendingSection({ products }) {
  const sectionRef = reactExports.useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const trending = products.filter((p) => p.isTrending).slice(0, 6);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "py-20 relative overflow-hidden",
      style: { background: "var(--section-alt-bg)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb-purple",
            style: {
              width: 400,
              height: 400,
              top: "10%",
              left: "-5%",
              opacity: 0.25
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb-pink",
            style: {
              width: 300,
              height: 300,
              bottom: "10%",
              right: "-3%",
              opacity: 0.2
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                animate: sectionInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.6 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Hot Right Now" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AnimatedWordHeading,
                    {
                      text: "Trending Now",
                      className: "font-display text-4xl font-black uppercase text-foreground"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.a,
              {
                href: "/products",
                initial: { opacity: 0, x: 20 },
                animate: sectionInView ? { opacity: 1, x: 0 } : {},
                transition: { duration: 0.5, delay: 0.3 },
                whileHover: { scale: 1.05 },
                className: "hidden sm:flex items-center gap-2 text-sm font-semibold",
                style: { color: "#00ffff" },
                "data-ocid": "trending.link",
                children: [
                  "View All",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block text-lg",
                      style: { filter: "drop-shadow(0 0 6px #00ffff)" },
                      children: "→"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: trending.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendingCard,
            {
              product,
              index: i,
              onAddToCart: () => addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: getProductImage(product),
                size: product.sizes[0] ?? "One Size",
                color: product.colors[0] ?? "#000"
              }),
              isWishlisted: has(product.id),
              onWishlistToggle: () => toggle(product.id)
            },
            product.id
          )) })
        ] })
      ]
    }
  );
}
function TrendingCard({
  product,
  index,
  onAddToCart,
  isWishlisted,
  onWishlistToggle
}) {
  const { theme } = z();
  const isDark = theme !== "light";
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: 80 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: index * 0.1
      },
      onHoverStart: () => setHovered(true),
      onHoverEnd: () => setHovered(false),
      whileHover: { scale: 1.03 },
      className: "group rounded-2xl overflow-hidden border cursor-pointer",
      style: {
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
        borderColor: hovered ? "rgba(0,255,255,0.6)" : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        boxShadow: hovered ? "0 0 0 1.5px #00ffff, 0 0 24px rgba(0,255,255,0.3)" : isDark ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease"
      },
      "data-ocid": `trending.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getProductImage(product),
              alt: product.title,
              className: "w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.12]",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
              style: {
                background: "linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(168,85,247,0.1) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full text-xs font-black",
              style: {
                background: "linear-gradient(135deg, #00ffff 0%, #a855f7 100%)",
                boxShadow: "0 0 10px rgba(0,255,255,0.6)",
                color: "#000"
              },
              children: [
                "#",
                index + 1
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onWishlistToggle,
              className: "absolute top-3 right-3 p-2 rounded-full",
              style: { background: "rgba(0,0,0,0.45)" },
              "data-ocid": `trending.toggle.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  size: 14,
                  className: isWishlisted ? "fill-red-500 text-red-500" : "text-white"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-luxe-cyan font-semibold uppercase tracking-wider mb-1", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground line-clamp-1 text-base", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mt-2 h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16",
              style: { background: "linear-gradient(90deg, #00ffff, #ff00ff)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-1 text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300",
              style: { color: isDark ? "#d8b4fe" : "#7c3aed" },
              children: "Shop Now →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-luxe-cyan text-lg", children: [
              "$",
              product.price.toFixed(2)
            ] }),
            product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
              "$",
              product.originalPrice.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              whileTap: { scale: 0.88 },
              onClick: onAddToCart,
              className: "w-full mt-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300",
              style: {
                background: isDark ? "rgba(0,255,255,0.08)" : "linear-gradient(135deg, #00cccc 0%, #a855f7 100%)",
                border: isDark ? "1px solid rgba(0,255,255,0.3)" : "none",
                color: isDark ? "#00ffff" : "#fff",
                boxShadow: isDark ? "none" : "0 2px 12px rgba(0,200,200,0.3)"
              },
              "data-ocid": `trending.submit_button.${index + 1}`,
              children: "Add to Cart"
            }
          )
        ] })
      ]
    }
  );
}
function FlashSaleSection({ products }) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const saleProducts = products.filter((p) => p.isFlashSale);
  const { addItem } = useCart();
  const [hoveredId, setHoveredId] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "max-w-7xl mx-auto px-4 sm:px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-3xl p-8 md:p-12 relative",
      style: {
        background: "var(--flash-sale-bg)",
        border: "1px solid rgba(0, 255, 255, 0.2)",
        overflow: "visible"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px",
            style: {
              background: "linear-gradient(90deg, transparent, #00ffff, transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -30 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 20, className: "text-yellow-400 fill-yellow-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-400 text-xs uppercase tracking-widest font-bold", children: "Limited Time Offer" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { clipPath: "inset(0 100% 0 0)" },
                    animate: inView ? { clipPath: "inset(0 0% 0 0)" } : {},
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-black uppercase text-foreground", children: "Flash Sale" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Deals end in:" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
            style: { overflow: "visible" },
            children: saleProducts.map((product, i) => {
              const isHovered = hoveredId === product.id;
              const discount = Math.round(
                (product.originalPrice - product.price) / product.originalPrice * 100
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TiltCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 30, scale: 1 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 20,
                        delay: i * 0.1
                      }
                    },
                    hover: {
                      scale: 1.07,
                      y: -12,
                      zIndex: 20,
                      transition: {
                        type: "spring",
                        stiffness: 700,
                        damping: 28,
                        mass: 0.5
                      }
                    }
                  },
                  initial: "hidden",
                  animate: inView ? "visible" : "hidden",
                  whileHover: "hover",
                  onHoverStart: () => setHoveredId(product.id),
                  onHoverEnd: () => setHoveredId(null),
                  className: "group rounded-2xl overflow-hidden border border-border/50 bg-white/5 cursor-pointer",
                  style: {
                    position: "relative",
                    boxShadow: isHovered ? "0 0 40px rgba(168,85,247,0.7), 0 0 80px rgba(217,70,239,0.4), 0 20px 60px rgba(0,0,0,0.6)" : "0 4px 20px rgba(0,0,0,0.3)",
                    borderColor: isHovered ? "rgba(168,85,247,0.8)" : "rgba(255,255,255,0.08)",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease"
                  },
                  "data-ocid": `flashsale.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square overflow-hidden relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.img,
                        {
                          src: getProductImage(product),
                          alt: product.title,
                          className: "w-full h-full object-cover",
                          animate: { scale: isHovered ? 1.12 : 1 },
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 22
                          },
                          loading: "lazy"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 pointer-events-none",
                          animate: { opacity: isHovered ? 1 : 0 },
                          transition: { duration: 0.3 },
                          style: {
                            background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(217,70,239,0.15) 100%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.span,
                        {
                          className: "absolute top-2 right-2 text-xs text-white px-2 py-1 rounded-full font-black",
                          style: {
                            background: "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                            boxShadow: "0 0 12px rgba(0,255,255,0.5), 0 0 24px rgba(255,0,255,0.3)"
                          },
                          animate: isHovered ? {
                            scale: [1, 1.2, 0.95, 1.1, 1],
                            rotate: [-2, 3, -2, 2, 0]
                          } : { scale: 1, rotate: 0 },
                          transition: {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          },
                          children: [
                            "-",
                            discount,
                            "%"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground line-clamp-1", children: product.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-luxe-cyan", children: [
                          "$",
                          product.price.toFixed(2)
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                          "$",
                          product.originalPrice.toFixed(2)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          type: "button",
                          whileTap: { scale: 0.88 },
                          animate: isHovered ? { scale: 1.04 } : { scale: 1 },
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 15
                          },
                          onClick: () => addItem({
                            productId: product.id,
                            title: product.title,
                            price: product.price,
                            image: getProductImage(product),
                            size: product.sizes[0] ?? "One Size",
                            color: product.colors[0] ?? "#000"
                          }),
                          className: "w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                          style: {
                            background: isHovered ? "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)" : "rgba(0,255,255,0.08)",
                            border: isHovered ? "1px solid rgba(0,255,255,0.9)" : "1px solid rgba(0,255,255,0.3)",
                            color: isHovered ? "#fff" : "#00ffff",
                            boxShadow: isHovered ? "0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(255,0,255,0.3)" : "none"
                          },
                          "data-ocid": `flashsale.primary_button.${i + 1}`,
                          children: "Add to Cart"
                        }
                      )
                    ] })
                  ]
                }
              ) }, product.id);
            })
          }
        )
      ]
    }
  ) });
}
function TestimonialsSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "py-20 relative overflow-hidden",
      style: { background: "var(--section-alt-bg)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb-purple",
            style: {
              width: 400,
              height: 400,
              top: "10%",
              left: "-5%",
              opacity: 0.25
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb-pink",
            style: {
              width: 300,
              height: 300,
              bottom: "10%",
              right: "-3%",
              opacity: 0.2
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "What People Say" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AnimatedWordHeading,
                  {
                    text: "Customer Stories",
                    className: "font-display text-4xl font-black uppercase gradient-text-vivid"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              whileHover: { y: -6, scale: 1.02 },
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: i * 0.1
              },
              className: "glass-card rounded-2xl p-6 testimonial-shimmer-card",
              "data-ocid": `testimonials.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: [0, 1, 2, 3, 4].slice(0, t.rating).map((starIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 14,
                    className: "fill-yellow-400 text-yellow-400"
                  },
                  starIdx
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6 italic", children: [
                  "“",
                  t.quote,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-luxe-cyan/20 flex items-center justify-center text-luxe-cyan font-bold text-sm", children: t.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.role })
                  ] })
                ] })
              ]
            },
            t.id
          )) })
        ] })
      ]
    }
  );
}
function BrandsSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const brands = [
    "Apple",
    "Samsung",
    "Nike",
    "Adidas",
    "Sony",
    "Bose",
    "Dyson"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "max-w-7xl mx-auto px-4 sm:px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: inView ? { opacity: 1 } : {},
        className: "text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-8",
        children: "Trusted Brands We Carry"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center items-center gap-8 md:gap-16", children: brands.map((brand, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { opacity: 0 },
        animate: inView ? { opacity: 1 } : {},
        whileHover: { scale: 1.15, y: -3 },
        transition: {
          opacity: { delay: i * 0.05 },
          scale: { type: "spring", stiffness: 400, damping: 12 },
          y: { type: "spring", stiffness: 400, damping: 12 }
        },
        className: "font-display font-black text-xl text-muted-foreground/40 hover:text-muted-foreground/80 transition-colors uppercase tracking-widest cursor-default",
        children: brand
      },
      brand
    )) })
  ] });
}
function HomePage() {
  const { data: backendProducts } = useAllProducts();
  const products = (backendProducts == null ? void 0 : backendProducts.length) ? backendProducts : mockProducts;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgressBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingSection, { products }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlashSaleSection, { products }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandsSection, {})
  ] });
}
export {
  HomePage as default
};
