import EventBus from "eventing-bus";

export const eventBusMiddleware = store => next => action => {
  const result = next(action);
  EventBus.publish(action.type);
  return result;
};
