import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export const errorInterceptors: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);

    return next(req).pipe(
        catchError((error) => {
            if (error) {
                switch (error.status) {
                    case 400:
                        toastr.error('Bad Request', 'Error 400');
                        break;
                    case 401:
                        toastr.error('Unauthorized Access', 'Error 401');
                        router.navigate(['/login']);
                        break;
                    case 403:
                        toastr.error('Forbidden', 'Error 403');
                        break;
                    case 404:
                        router.navigateByUrl("/not-found");
                        toastr.error('Resource Not Found', 'Error 404');
                        break;
                    case 500:
                        toastr.error('Internal Server Error', 'Error 500');
                        const navigationExtras: NavigationExtras = {state: {error: error.error}}
                        router.navigateByUrl("/server-error", navigationExtras)
                        break;
                    default:
                        toastr.error('An unknown error occurred', 'Error');
                        break;
                }
            }
            return throwError(() => error);
        })
    );
};
