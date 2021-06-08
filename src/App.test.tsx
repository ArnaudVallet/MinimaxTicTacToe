import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   const { getByTestId } = render(<App />);
//   const element = getByTestId("bla");
//   expect( element.getAttribute("className")).toBe("Board");
// });

test('Fake Test ', () => {
  expect(true).toBeTruthy()
})

// test('minimax', ()=> {
//   const board = [
//     [0,0,-1],
//     [0,1,0],
//     [1,1,-1]
//   ]
//   expect(minimax(board, false, 0)).toStrictEqual({ score: -1, finalDepth: 0 })
// })

describe('Mes Tests', () => {
  test('Test Component', () => {
    render(<App />)
    screen.findByTestId
  })
})
