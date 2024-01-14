FROM eclipse-temurin:21-alpine
WORKDIR /
EXPOSE 8080
COPY build/libs/clearContApp-0.0.2-ALPHA.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]