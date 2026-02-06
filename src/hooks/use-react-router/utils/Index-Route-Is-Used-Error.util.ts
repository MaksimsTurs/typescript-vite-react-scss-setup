export default class IndexRouteIsUsedError extends Error {
  constructor(currentIndex?: string) {
    super(`Index route is used ${currentIndex}!`);
  };
};