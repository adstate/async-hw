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

//TODO сделать через определитель

function calcTriangleArea(x1, y1, x2, y2, x3, y3, cb) {
    async function sideLength(x1, y1, x2, y2) {
        const a = await subtract(x2, x1);
        const b = await subtract(y2, y1);

        return await sqrt(await add(
            await multiply(a, a),
            await multiply(b, b)
        ));
    }

    async function halfPerimeter(a, b, c) {
        return await divide(
            await add(await add(a, b), c),
            2
        );
    }

    let A, B, C, P;

    Promise.all([
        sideLength(x1, y1, x2, y2),
        sideLength(x2, y2, x3, y3),
        sideLength(x3, y3, x1, y1)
    ])
    .then(([a, b, c]) => {
        A = a; B = b; C = c;

        return halfPerimeter(a, b, c);
    })
    .then(res => {
        P = res;

        return Promise.all([
            subtract(P, A),
            subtract(P, B),
            subtract(P, C)
        ])
    })
    .then(([v1, v2, v3]) => {
        return Promise.all([
            multiply(P, v1),
            multiply(v2, v3)
        ]);
    })
    .then(([v1, v2]) => multiply(v1, v2))
    .then(res => sqrt(res))
    .then(res => cb(res))
}

calcTriangleArea(1, 1, 2, 2, 3, 1, (res) => {
    console.log('Площадь треугольника', res);
});