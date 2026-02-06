export default class ExecutionOutsideContextError extends Error {
  constructor() {
    super("You should wrap your App into Routes component!");
  };
};