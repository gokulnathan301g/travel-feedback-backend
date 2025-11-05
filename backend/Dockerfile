# Multi-stage Dockerfile for building and running the Spring Boot app
# Build stage
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY AnswerSaverApp/backend/pom.xml ./ 
# copy only pom first to leverage cache for maven deps
COPY AnswerSaverApp/backend/src ./src
RUN mvn -f pom.xml -DskipTests clean package

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy jar from build stage (assumes spring-boot-maven-plugin produced an executable jar)
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
