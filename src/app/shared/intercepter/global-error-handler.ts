import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from 'src/app/services/error-services/logging.service';
import { ErrorService } from 'src/app/services/error-services/error.service';
import { ToastService, TYPE } from 'src/app/services/toast';
import { DataService } from 'src/app/services/data/data.service';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private dataService: DataService) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const toast = this.injector.get(ToastService);


    let message: string;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      if (error.status == 500) toast.toast(message, TYPE.ERROR);
      if (error.status === 400) {
        //stackTrace = errorService.getServerErrorStackTrace(error);
        toast.toast(message, TYPE.WARNING)
      }

    } else {
      // Client Error
      console.log('error', typeof (error))
      message = errorService.getClientErrorMessage(error);
      // toast.toast(message, TYPE.WARNING)

    }
    // Always log errors
    logger.errorConsole(message);
    console.error("global error ===>",  error);
  }
}
