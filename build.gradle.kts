plugins {
    java
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.vaadin") version "24.1.12"
}

group = "com.clearcont"
version = "0.5.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}
vaadin {
    productionMode = true
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
    maven {
        url = uri("https://maven.vaadin.com/vaadin-addons")
    }
    maven {
        url = uri("https://maven.vaadin.com/vaadin-prereleases")
    }
    maven {
        url = uri("https://mvnrepository.com/artifact/org.vaadin.crudui/crudui")
    }
}

extra["vaadinVersion"] = "24.1.12"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.2.1")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.2.2")
    implementation("org.springframework.boot:spring-boot-starter-security:3.2.2")
    implementation("org.springframework.boot:spring-boot-starter-validation:3.2.2")
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.1")
    implementation("commons-io:commons-io:2.15.1")
    implementation("com.vaadin:vaadin-spring-boot-starter:24.3.3")
    implementation("org.vaadin.crudui:crudui:7.1.0")
    implementation("com.storedobject.chart:so-charts:3.2.4")
    implementation("org.apache.poi:poi-ooxml:5.2.5")
    implementation("org.springframework.security:spring-security-oauth2-jose:6.2.1")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:6.2.1")
    implementation("jakarta.validation:jakarta.validation-api:3.1.0-M1")
    implementation("com.amazonaws:aws-java-sdk-s3:1.12.669")
    implementation("org.jetbrains:annotations:24.0.0")
    implementation("org.jetbrains:annotations:24.0.0")
    compileOnly("org.projectlombok:lombok:1.18.30")
    developmentOnly("org.springframework.boot:spring-boot-devtools:3.2.2")
    runtimeOnly("com.mysql:mysql-connector-j:8.3.0")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test:3.2.2")
    testImplementation("org.springframework.security:spring-security-test:6.1.5")
}

dependencyManagement {
    imports {
        mavenBom("com.vaadin:vaadin-bom:${property("vaadinVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.jar {
    enabled = false
}