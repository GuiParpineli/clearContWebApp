import org.graalvm.buildtools.gradle.tasks.BuildNativeImageTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.core.env.PropertySource.named

plugins {
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.vaadin") version "24.3.8"
    id("org.graalvm.buildtools.native") version "0.10.2"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
    kotlin("plugin.jpa") version "1.9.23"
    application
}

group = "br.com.clearcont"
version = "0.9.8"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

application {
    mainClass.set("br.com.clearcont.clearcontwebapp.ClearContWebAppKtApplicationKt")
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
    maven {
        url = uri("https://raw.githubusercontent.com/graalvm/native-build-tools/snapshots")
    }
    gradlePluginPortal()
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

extra["springBootAdminVersion"] = "3.3.3"
extra["vaadinVersion"] = "24.4.6"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-security:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.2.4")
    implementation("org.springframework.security:spring-security-oauth2-jose:6.2.4")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:6.2.3")
    implementation("software.amazon.jdbc:aws-advanced-jdbc-wrapper:2.3.7")

    implementation("org.springframework.boot:spring-boot-starter-web:3.2.4")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.0")
    implementation("org.vaadin.crudui:crudui:7.1.0")
    implementation("com.storedobject.chart:so-charts:3.2.4")
    implementation("com.vaadin:vaadin-spring-boot-starter:24.3.10")
    implementation("org.apache.poi:poi-ooxml:5.2.5")
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")
    implementation("de.codecentric:spring-boot-admin-starter-client:3.2.3")
    implementation("commons-io:commons-io:2.16.1")
    implementation("org.jetbrains.kotlin:kotlin-reflect:2.0.0")
    implementation("software.amazon.awssdk:s3:2.25.60")
    implementation("software.amazon.awssdk:auth:2.25.60")
    implementation("software.amazon.awssdk:regions:2.26.25")
    implementation("software.amazon.awssdk:utils:2.26.23")

//    implementation("org.flywaydb:flyway-core:10.15.2")
//    implementation("org.flywaydb:flyway-mysql:10.15.2")

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
graalvmNative {
    binaries {
        named("main") {
            useFatJar.set(true)
        }
    }
}
