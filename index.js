const {
    AsyncArray,
    add,
    subtract,
    multiply,
    divide,
    mod,
    less,
    equal,
    lessOrEqual,
    sqrt
} = HomeworkAsync;

const abs = (x) => {
    return less(x, 0).then(res => (res) ? multiply(x, -1) : x);
}

function triangleArea(x1, y1, x2, y2, x3, y3, cb) {
    Promise.all([
        subtract(x1, x3),
        subtract(y1, y3),
        subtract(x2, x3),
        subtract(y2, y3)
    ])
    .then(([a1, b1, a2, b2]) => {
        return Promise.all([
            multiply(a1, b2),
            multiply(b1, a2)
        ])
    })
    .then(([c, d]) => subtract(c, d))
    .then(n => abs(n))
    .then(n => divide(n, 2))
    .then(res => cb(res))
    .catch(err => console.log('Ошибка вычисления'))
}

console.log('вычислить площадь треугольника для x1=1, x2=1, y1=2, y2=2, x3=3, y3=1');
triangleArea(1, 1, 2, 2, 3, 1, (res) => {
    console.log('площадь треугольника равна', res);
});

console.log('вычислить площадь треугольника для x1=1, x2=1, y1=2, y2=8, x3=3, y3=6');
triangleArea(1, 1, 2, 8, 3, 6, (res) => {
    console.log('площадь треугольника равна', res);
});
