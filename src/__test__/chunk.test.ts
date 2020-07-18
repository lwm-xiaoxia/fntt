import chunk from '../array/chunk';

test('测试 chunk', () => {
    expect( chunk(3, [0, 1, 2, 3, 4, 5 ,6 ,7, 8, 9]) )
    .toBe([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
});