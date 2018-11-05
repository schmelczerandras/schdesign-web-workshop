import * as React from 'react';
import Layout from '../components/Layout';
import TodoListItem from '../models/TodoListItem';

interface Props {}

interface State {
  items: TodoListItem[];
  newItemText: string;
}

export default class TodoListPage extends React.Component<Props, State> {
  // The type of `state` must be annotated explicitly because subclasses are
  // allowed to have narrower properties than their base classes
  // See:
  // - https://github.com/Microsoft/TypeScript/issues/25785#issuecomment-406247138
  // - https://github.com/Microsoft/TypeScript/issues/10570#issuecomment-296860943
  state: State = {
    items: [],
    newItemText: '',
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Keep track of the input value without having to reference HTML elements
    this.setState({ newItemText: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit behavior, which would reload the page
    e.preventDefault();

    const { newItemText } = this.state;

    // Prevent adding empty items
    if (newItemText.length > 0) {
      this.addItem({
        id: Date.now(), // TODO: Replace this with a UUID or sequence counting
        text: newItemText,
      });
    }
  };

  // This method doesn't need to be defined as an arrow function class property
  // because it isn't directly referenced by `render()`
  // See: https://reactjs.org/docs/faq-functions.html#why-is-binding-necessary-at-all
  addItem(item: TodoListItem) {
    this.setState(state => ({
      // Expand list by appending the new item to the end of the cloned array
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals
      items: [...state.items, item],

      // Clear input field
      newItemText: '',
    }));
  }

  render() {
    const { items, newItemText } = this.state;

    return (
      <Layout>
        <h1>To-do list</h1>

        <ul>
          {items.map(item => (
            <li
              // Mapped components must always have a locally unique `key` prop
              // See: https://reactjs.org/docs/lists-and-keys.html#keys
              key={item.id}
            >
              {item.text}
            </li>
          ))}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-item-text">
            <div>What needs to be done?</div>
            <input
              id="new-item-text"
              value={newItemText}
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">+</button>
        </form>
      </Layout>
    );
  }
}
