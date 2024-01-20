FROM eclipse-temurin:21-alpine
WORKDIR /
EXPOSE 8080
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]