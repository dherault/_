import store from './store';

const foo = () => store.dispatch({ type: 'foo' });

export {
  foo
}
