import {Directive, OnDestroy} from "@angular/core";
import {Subject, MonoTypeOperatorFunction, Observable} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractDestroyable implements OnDestroy {

    private readonly destroy$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Operator to automatically interrupt subscription on destroy: for existing pipe usage.
     * Example: myObservable.pipe(tap(...), takeUntilDestroy()).subscribe();
     */
    protected untilDestroy<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil<T>(this.destroy$);
    }

    /**
     * Operator to automatically interrupt subscription on destroy: not to require single operator pipe usage.
     * Example: takeUntilDestroy(myObservable).subscribe(...);
     */
    protected takeUntilDestroy<T>(toTakeUntil: Observable<T>): Observable<T> {
        return toTakeUntil.pipe(this.untilDestroy<T>());
    }
}

