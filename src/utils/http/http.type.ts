export type HTTPConfiguration = {
  base?: string
};

export type HTTPRequestOptions<E = unknown> = {
  processAs?: HTTPProcessResponseAs
  headers?: HTTPRequestHeaders
  body?: any
} & E & Omit<RequestInit, "body" | "headers">;

export type HTTPRequestHeaders = Record<string, string>;

export type HTTPRequestBody =
  | string
  | Blob
  | DataView
  | ArrayBuffer
  | File
  | URLSearchParams
  | FormData
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export type HTTPProcessResponseAs = 
  | "json" 
  | "text" 
  | "arrayBuffer" 
  | "blob" 
  | "bytes";
