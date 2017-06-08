declare module "sworn" {
    interface Sworn<T> {
        catch<TResult = never>(onRejection?: (reason: TResult) => any): Sworn
        fail<TResult = never>(onRejection?: (reason: TResult) => any): Sworn
        static resolve<TResult>(result: TResult): Sworn<TResult>
        static reject<TResult = never>(onRejection?: (reason: TResult) => any): Sworn
        static all(iterable: Array): Sworn
        static race(iterable: Array): Sworn    
    }
}
