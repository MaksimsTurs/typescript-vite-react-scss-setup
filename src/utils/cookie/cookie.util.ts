import type { CookieHelper } from "./types/cookie.type";

import get from "./utils/get.util";
import set from "./utils/set.util";
import remove from "./utils/remove.util";

const cookie: CookieHelper = {
	MAX_AGE: [
		// Days.
		86400,
		172800,
		259200,
		345600,
		424800,
		511200,
		// Weeks.
		597600
	],
  get,
  set,
	remove
};

export default cookie;