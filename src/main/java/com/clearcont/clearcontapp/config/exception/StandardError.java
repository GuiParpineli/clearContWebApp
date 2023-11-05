package com.clearcont.clearcontapp.config.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StandardError implements Serializable {
    private Integer code;
    private String error;
    private String message;
}
