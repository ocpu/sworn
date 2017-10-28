interface Sworn<T> extends Promise<T> {
    fail<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>
}

declare var Sworn: {
    new <T>(resolver?: (resolve?: (value: T) => void, reject?: (reason: Error | string) => void) => void): Sworn<T>
    prototype: Sworn<any>
    resolve<T>(result: T): Sworn<T>
    reject(reason?: (reason: Error | string) => any): Sworn<never>
    all<T>(iterable: Array<Promise<T>>): Sworn<Array<T>>
    race<T>(iterable: Array<Promise<T>>): Sworn<T>
    deferred<T>(): {
        resolve: (value: T) => void
        reject: (reason: Error | string) => void
        promise: Sworn<T>
    }
    cancel<T>(resolver: (resolve?: (value: T) => void, reject?: (reason: Error | string) => void) => void, onCancel: () => void): {
        promise: Sworn<T>
        cancel: () => void
    }
    callback<T>(promise: Promise<T>, callback: (reason: Error | string, value: T) => void): void
}

declare module "sworn" {
    export = Sworn
}

export = Sworn
