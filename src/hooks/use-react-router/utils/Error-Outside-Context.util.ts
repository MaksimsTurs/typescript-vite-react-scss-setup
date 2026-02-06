export default class ExecutionOutsideContext extends Error {
  constructor() {
    super("You should wrap your App into Routes component!");
  };
};