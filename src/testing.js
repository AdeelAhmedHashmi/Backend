Promise.resolve(async function 
    () {
    const data = await fetch('https://jsonplaceholder.typicode.com/')
    const res = await data.json()
    return (res)
}).then((e)=>{
    console.log(e)
}).catch((E)=>{
    console.log(E)
})