import type { KeyOf } from "@root/global.type";

export default function inObject<O = unknown>(keys?: KeyOf<O>[] | null, object?: any | null): boolean {
	if(!object || !keys) {
		return false;
	}

	let index: number = 0;

	const length: number = keys.length;

  while(index < length) {
    if(Object.hasOwn(object, keys[index])) {
			return true;
		}

    index++;
  }

  return false;
};