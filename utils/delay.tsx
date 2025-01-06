 const delay = (ms: number) => {
    return new Promise<void>(resolve => setTimeout(() => {
        console.log(`${ms / 1000}s timeout`)
        resolve()
    }, ms))
}

export default delay