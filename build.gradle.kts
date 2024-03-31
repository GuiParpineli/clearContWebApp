import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.vaadin") version "24.3.8"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
    kotlin("plugin.jpa") version "1.9.23"
}

group = "br.com.clearcont"
version = "0.9.0-RELEASE_CANDIDATE"

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
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.2.4")
    implementation("org.springframework.security:spring-security-oauth2-jose:6.2.3")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:6.2.1")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.vaadin.crudui:crudui:7.1.0")
    implementation("com.storedobject.chart:so-charts:3.2.4")
    implementation("com.vaadin:vaadin-spring-boot-starter")
    implementation("org.apache.poi:poi-ooxml:5.2.5")
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")
    implementation("de.codecentric:spring-boot-admin-starter-client")
    implementation("commons-io:commons-io:2.15.1")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("com.amazonaws:aws-java-sdk-s3:1.12.689")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("com.mysql:mysql-connector-j")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
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

tasks.withType<Test> {
    useJUnitPlatform()
}
