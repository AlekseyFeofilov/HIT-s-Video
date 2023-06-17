import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../services/error-services/error/error.service";
import {ErrorLoggingService} from "../../services/error-services/error-logging/error-logging.service";
import {ErrorNotificationService} from "../../services/error-services/error-notification/error-notification.service";

@Injectable()
export class ErrorHandlerMiddleware implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(ErrorLoggingService);
    const notifier = this.injector.get(ErrorNotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);

      if (error.status === 401){
        notifier.showError("Авторизуйтесь для того, чтобы воспользоваться ресурсом");
      }
      else if (error.status === 500) {
        notifier.showError("Internal server error");
      }
      else {
        notifier.showError("Unhandled error...");
      }
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
  }
}
