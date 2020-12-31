const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error());
    }, 1000);
  });
  
  myPromise
    .then(n => {
        console.log('haha')
      console.log(n);
    })
    .catch(error => {
        console.log('uhoh')
      console.log(error);
    });