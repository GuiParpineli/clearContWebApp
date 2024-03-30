FROM eclipse-temurin:21-alpine
WORKDIR /

EXPOSE 8080
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
