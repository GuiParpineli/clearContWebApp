package com.clearcont.clearcontapp.config.exception;

import com.grupocriar.seitran.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.format.DateTimeParseException;

@RestControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<StandardError> invalidData(InvalidDataException e) {
        String error = "Dados inválidos";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), error, e.getMessage());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ConvertException.class)
    public ResponseEntity<StandardError> convert(ConvertException e) {
        String error = "Erro na conversão.";
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        StandardError err = new StandardError(status.value(), error, e.getMessage());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(RequestException.class)
    public ResponseEntity<StandardError> request(RequestException e) {
        String error = "Erro de Requisição.";
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        StandardError err = new StandardError(status.value(), error,  e.getMessage());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(SQLCallException.class)
    public ResponseEntity<StandardError> sqlexception(SQLCallException e) {
        String error = "Erro de Banco de Dados.";
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        StandardError err = new StandardError(status.value(), error, e.getMessage());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<StandardError> datetimeParse(DateTimeParseException e) {
        String error = "Erro de Conversão de Data.";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(status.value(), error, e.getMessage());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity invalidArgument(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(erros.stream().map(DadosErroValidacao::new).toList());
    }

    @ExceptionHandler(NoneResultException.class)
    public ResponseEntity<StandardError> noResultException(NoneResultException e) {
        String error = "Sem Resultados";
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        StandardError standardError = new StandardError(httpStatus.value(), error, e.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }
}

