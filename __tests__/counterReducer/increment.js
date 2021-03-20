import store from '../../src/store';
import counterReducer, {increment} from '../../src/store/models/counter';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(counterReducer(undefined, {})).toStrictEqual({value: 0});
  });
  it('should return 1', () => {
    const state = store.getState().counter;
    store.dispatch(increment());
    const newState = store.getState().counter;
    expect(newState.value).toStrictEqual(state.value + 1);
  });
});
