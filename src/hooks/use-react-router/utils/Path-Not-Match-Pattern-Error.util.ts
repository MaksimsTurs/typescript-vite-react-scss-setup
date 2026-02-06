export default class PathNotMatchPatternError extends Error {
  constructor(pattern?: string, path?: string) {
    super(`"${path}" does not match "${pattern}"!`);
  };
};