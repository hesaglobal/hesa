import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    logConsole(message: string, stack?: string) {
        // Send errors to server here
        console.log('LoggingService: =====>' + message);
    }

    errorConsole(message: string, stack?: string) {
        console.error('LoggingService: =====>' + message);
    }

}
