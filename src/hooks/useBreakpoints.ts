import { useWindowSize } from './useOnWIndowResize';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

/**
 * Asserts that the window side is above the given breakpoint or in between the two
 * @returns boolean
 */
const useBreakpoints = ({
  below,
  above,
}:
  | { above: Breakpoint; below?: Breakpoint }
  | { above?: Breakpoint; below: Breakpoint }) => {
  const { width } = useWindowSize();
  if (above && below) {
    return width < breakpoints[below] && breakpoints[above] < width;
  }

  if (!above) return breakpoints[below] > width;

  return breakpoints[above] > width;
};

export default useBreakpoints;
