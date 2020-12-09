

import { generateList } from '../list';

test('shold generate a list', () => {
   


//entrada: 5
//ARRANGE

const amount = 5;

//ACT

const result = generateList(amount);

// saida: [0, 1, 2, 3, 4,]

//ASSERT

expect(result).toEqual([0,1,2,3,4 ]);

});


test('shold generate an empty list when amount is zero', () => {
   


//entrada: 5
//ARRANGE

const amount = 0;

//ACT

const result = generateList(amount);

// saida: [0, 1, 2, 3, 4,]

//ASSERT

expect(result).toEqual([ ]);

});