async function babeltest(){
  return await Promise.resolve('test babel');
}

babeltest().then((rres) => console.log(rres))