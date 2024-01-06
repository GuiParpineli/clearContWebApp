package com.clearcont.clearcontapp.helpers;

import java.util.logging.Logger;

public abstract class Log {
    public static void log(String className, String loggable) {
        Logger logger = Logger.getLogger(className);
        logger.info(loggable);
    }
}
