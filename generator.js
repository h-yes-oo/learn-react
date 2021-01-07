function* generatorFunction() {
    console.log('hihi');
    yield 1;
    console.log('wow');
    yield 2;
    console.log('function*');
    yield 3;
    return 4;
}

const generator = generatorFunction();

generator.next();
generator.next();
generator.next();

function* watchGenerator() {
    console.log('모니터링 시작!');
    while(true) {
        const action = yield;
        if (action.type === 'HELLO') {
            console.log('안녕하세요?');
        }
        if (action.type === 'BYE') {
            console.log('안녕히가세요.');
        }
    }
}