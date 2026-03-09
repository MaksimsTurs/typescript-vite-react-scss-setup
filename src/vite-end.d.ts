/// <reference types="vite/client" />

declare type KeyOf<T = any> = keyof T;

declare type Constructable = abstract new (...args: any) => any;
