function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function process() {
    console.log('hello!');
    await sleep(1000); //해당 프로미스가 끝날때까지 기다렸다가 다음 작업을 수행한다
    console.log('nice to meet you!');
}

async function makeError() {
    await sleep(1000);
    const error = new Error();
    throw error;
}

process().then(()=>{
    console.log('finished!');
});

async function error(){
    try {
        await makeError();
    } catch (e) {
        console.log(e);
    }
}

error();