// 数组回调函数类型
export type PattFuncType = <T>(value: T, index: number) => boolean;

// 数组匹配到到回调函数类型
export type HandleFuncType = <T>(value: T, index: number) => any;