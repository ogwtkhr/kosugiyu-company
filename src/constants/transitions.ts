const BASE_TRANSITION_FUNCTION = 'ease' as const;
const BASE_TRANSITION_TIME = '0.5s' as const;
const BASE_TRANSITION = `${BASE_TRANSITION_TIME} ${BASE_TRANSITION_FUNCTION}`;

export const Transitions = {
  BASE_TRANSITION,
  BASE_TRANSITION_LONG: `1s ${BASE_TRANSITION_FUNCTION}`,
  HOVER_TRANSITION_NORMAL: BASE_TRANSITION,
} as const;

export default Transitions;