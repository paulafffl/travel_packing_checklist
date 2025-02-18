// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

export const mockContextValue = {
  listsObj: {},
  listsShown: [],
  listsWithItemsShown: [],
  listsAdded: [],
  listHiding: '',
  addList: jest.fn(),
  addItem: jest.fn(),
  showList: jest.fn(),
  hideList: jest.fn(),
  removeList: jest.fn(),
  removeItem: jest.fn(),
  resetList: jest.fn(),
  changeItem: jest.fn(),
  packAllItems: jest.fn(),
  unpackAllItems: jest.fn(),
  startNewTrip: jest.fn(),
};
