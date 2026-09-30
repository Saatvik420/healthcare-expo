# Root Dockerfile for Render deployment
# Builds the Spring Boot backend located in "healthcare backend"

# Stage 1: Build JAR with JDK 21 and Maven
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy Maven wrapper and POM from "healthcare backend"
COPY ["healthcare backend/.mvn/", ".mvn/"]
COPY ["healthcare backend/mvnw", "healthcare backend/pom.xml", "./"]
RUN chmod +x ./mvnw

# Pre-fetch dependencies
RUN ./mvnw dependency:go-offline -B

# Copy backend source code and build jar
COPY ["healthcare backend/src/", "./src/"]
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
