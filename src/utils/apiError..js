class ApiError extends Error {
    constructor(
        statueCode,
        message='Something went wrong',
        errors = [],
        stacks = ''
    ) {
        super(message)
        this.statueCode = statueCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = this.errors

        if(stacks) {
            this.stack = stacks
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError} 
