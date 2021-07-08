export const NetworkError = (error) => {
    if (error.code === 'unavailable') {
        console.log('Internet Faliure')
        return
    }

    throw error
}