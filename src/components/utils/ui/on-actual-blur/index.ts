/**
 * This method will run the callback if the onBlur event
 * did not came from a child element of the target
 */
type onBlurEvent = React.FocusEvent<any>;

export const onActualBlur = (callback: (event: onBlurEvent) => void) => (
  event: onBlurEvent
) => {
  event.persist();
  const { currentTarget, relatedTarget } = event;
  if (!relatedTarget) {
    callback(event);
  } else if (relatedTarget && !currentTarget.contains(relatedTarget as Node)) {
    callback(event);
  }
};
