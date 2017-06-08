declare module "sworn" {
    interface Sworn<T> {
        then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Sworn<TResult1 | TResult2>
    }
    declare var Sworn: {
        new<T>(resolver: (resolve?: (result: T | Sworn<T>) => void, reject: (reason: Error | string | any) => void) => void): Sworn<T>
        prototype: Sworn
    }
}

export = Promise
