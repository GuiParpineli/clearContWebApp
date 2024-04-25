import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.vaadin") version "24.3.8"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
    kotlin("plugin.jpa") version "1.9.23"
}

group = "br.com.clearcont"
version = "0.9.9-RELEASE_CANDIDATE"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}
vaadin {
    productionMode = true
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

extra["springBootAdminVersion"] = "3.2.3"
extra["vaadinVersion"] = "24.3.8"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-security:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.2.4")
    implementation("org.springframework.security:spring-security-oauth2-jose:6.2.4")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:6.2.3")
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.4")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.0")
    implementation("org.vaadin.crudui:crudui:7.1.0")
    implementation("com.storedobject.chart:so-charts:3.2.4")
    implementation("com.vaadin:vaadin-spring-boot-starter:24.3.10")
    implementation("org.apache.poi:poi-ooxml:5.2.5")
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")
    implementation("de.codecentric:spring-boot-admin-starter-client:3.2.3")
    implementation("commons-io:commons-io:2.16.1")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.23")
    implementation("com.amazonaws:aws-java-sdk-s3:1.12.706")

    developmentOnly("org.springframework.boot:spring-boot-devtools:3.2.5")
    runtimeOnly("com.mysql:mysql-connector-j:8.3.0")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor:3.2.5")
    testImplementation("org.springframework.boot:spring-boot-starter-test:3.2.4")
    testImplementation("org.springframework.security:spring-security-test:6.2.4")
}

dependencyManagement {
    imports {
        mavenBom("de.codecentric:spring-boot-admin-dependencies:${property("springBootAdminVersion")}")
        mavenBom("com.vaadin:vaadin-bom:${property("vaadinVersion")}")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "21"
    }
}

tasks.jar {
    enabled = false
}

tasks.withType<Test> {
    useJUnitPlatform()
}
