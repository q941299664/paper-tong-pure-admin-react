/**
 * 头部高度
 */
export const HEADER_HEIGHT = 50;

/**
 * 侧边栏宽度
 */
export const SIDEBAR_WIDTH = 240;

export enum Breakpoints {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

type ScreenBreakPoints = {
  [key in Breakpoints]: number;
};

/**
 * 响应式断点
 */
export const SCREEN_BREAK_POINTS: ScreenBreakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
