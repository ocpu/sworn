interface Sworn<T> {
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Sworn<TResult1 | TResult2>
}

declare var Sworn: {
    new <T>(resolver?: (resolve?: (value: T) => void, reject?: (reason: Error | string) => void) => void): Sworn<T>
    prototype: Sworn<any>
}


declare module "sworn" {
    export = Sworn
}
export = Sworn
