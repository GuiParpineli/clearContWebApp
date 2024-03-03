ARG JAR_FILE=app.jar

FROM eclipse-temurin:21-alpine
WORKDIR /

EXPOSE 8080

# use the ARG variable
COPY build/libs/*.jar ${JAR_FILE}

# reference to the ARG variable
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=prod", "-jar", "${JAR_FILE}"]