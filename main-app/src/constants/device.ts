/** iPhone 17 Pro 原型画布：逻辑像素与外壳尺寸（与 Figma/设计稿 402×874 一致） */
export const IPHONE_17_PRO_SCREEN_WIDTH = 402;
export const IPHONE_17_PRO_SCREEN_HEIGHT = 874;

/** 金属边框（单侧） */
export const IPHONE_17_PRO_BEZEL = 14;

/** 屏幕圆角（显示区域内） */
export const IPHONE_17_PRO_DISPLAY_RADIUS = 47;

/** 灵动岛（相对屏幕顶部偏移） */
export const IPHONE_17_PRO_ISLAND_WIDTH = 126;
export const IPHONE_17_PRO_ISLAND_HEIGHT = 37;
export const IPHONE_17_PRO_ISLAND_TOP = 11;

export const IPHONE_17_PRO_DEVICE_WIDTH =
  IPHONE_17_PRO_SCREEN_WIDTH + IPHONE_17_PRO_BEZEL * 2;

export const IPHONE_17_PRO_DEVICE_HEIGHT =
  IPHONE_17_PRO_SCREEN_HEIGHT + IPHONE_17_PRO_BEZEL * 2;

/** 外壳圆角（含边框） */
export const IPHONE_17_PRO_SHELL_RADIUS = IPHONE_17_PRO_DISPLAY_RADIUS + IPHONE_17_PRO_BEZEL;

/** 一级底部 TabBar 高度（与 MainLayout bottom 留白一致；二三级屏内 bottom inset 同源） */
export const PROTOTYPE_TAB_BAR_HEIGHT = 83;

/**
 * 舞台外层与 usePrototypeScale 共用：每边留白（px）。
 * 缩放公式减去的总宽高 = 2 * STAGE_PADDING
 */
export const PROTOTYPE_STAGE_PADDING = 20;
