export const isString     = (something: any): something is string => typeof something === "string";
export const isNumber     = (something: any): something is number => typeof something === "number";
export const isBoolean    = (something: any): something is boolean => typeof something === "boolean";
export const isUndefined  = (something: any): something is undefined => something === undefined;
export const isNull       = (something: any): something is null => something === null;
export const isArray      = <T = any>(something: any): something is T[] => Array.isArray(something);
export const isObject     = <T extends Record<any, any>>(something: any): something is T => Object.getPrototypeOf(something) === Object.prototype && !isArray(something);
export const isFunction   = <T = any>(something: any): something is T => typeof something === "function";
export const isBigNumber  = (something: any): something is bigint => typeof something === "bigint";
export const isSymbol     = (something: any): something is symbol => typeof something === "symbol";
export const isInstanceOf = <T extends Constructable>(maybeInstance: any, Constructor: T): maybeInstance is InstanceType<T> => maybeInstance instanceof Constructor;
export const isPrimitive  = (something: any): boolean => (
  isString(something)    ||
  isNumber(something)    ||
  isNull(something)      ||
  isUndefined(something) ||
  isBoolean(something)   ||
  isBigNumber(something) ||
  isSymbol(something)    
);
