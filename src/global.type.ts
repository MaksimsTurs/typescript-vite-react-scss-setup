export type JSPrimitiveTypes = string | number | boolean | undefined | null;

export type JSReferenceTypes = [] | {} | symbol;

export type Dictionary<K extends string | symbol | number, V = unknown> = { [key in K]?: V };

export type KeyOf<T = any> = keyof T;

export type VoidFunction = () => void;

export type Constructable = Function