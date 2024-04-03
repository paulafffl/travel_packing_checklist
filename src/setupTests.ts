// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

export const mockContextValue = {
  listsObj: {},
  listsShown: [],
  listsWithItemsShown: [],
  showItems: jest.fn(),
  hideItems: jest.fn(),
  showList: jest.fn(),
  hideList: jest.fn(),
  addItem: jest.fn(),
  addList: jest.fn(),
  listAdded: jest.fn(),
  removeItem: jest.fn(),
  removeList: jest.fn(),
  resetList: jest.fn(),
  changeItem: jest.fn(),
  packAllItems: jest.fn(),
  unpackAllItems: jest.fn(),
};
