package com.clearcont.clearcontapp.config.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsHandler {

/*    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<StandardError> invalidData(InvalidDataException e) {
        String error = "Dados inválidos";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), error, e.getMessage());
        return ResponseEntity.status(status).body(err);
    }*/

}

