// const {increment} = require('../../src/store/models/counter');
const store = require('../../src/store');
const counterReducer = require('../../src/store/models/counter');

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(counterReducer.default(undefined, {})).toStrictEqual({value: 0});
  });
  it('should return 1', () => {
    const state = store.default.getState().counter;
    store.default.dispatch(counterReducer.increment());
    const newState = store.default.getState().counter;
    expect(newState.value).toStrictEqual(state.value + 1);
  });
});
