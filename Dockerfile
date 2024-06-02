FROM eclipse-temurin:21-alpine
WORKDIR /
EXPOSE 8080
COPY build/libs/*.jar app.jar
RUN mkdir /logs
ENTRYPOINT ["java", "-Xms512m", "-Xmx1024m", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
