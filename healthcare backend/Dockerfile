# Multi-stage Dockerfile for Spring Boot on Render
# Stage 1: Build JAR using Maven and JDK 21
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy Maven wrapper & pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw

# Resolve dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code and package application
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal JRE Runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default port (Render will bind to $PORT dynamically)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
