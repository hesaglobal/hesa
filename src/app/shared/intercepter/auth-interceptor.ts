import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
 
import { TokenStorage } from "src/app/services/auth/token.storage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: TokenStorage){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authtoken = this.authService.getToken(); 

        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authtoken)
        })

        return next.handle(authRequest);
    }
    
}