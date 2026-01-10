# ---------- BUILD STAGE ----------
FROM eclipse-temurin:21-jdk AS build

WORKDIR /build

# Copy Maven wrapper and config first (for caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests


# ---------- RUN STAGE ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy generated jar
COPY --from=build /build/target/*.jar expensetracker.jar

# JVM options optimized for containers
ENV JAVA_OPTS="-XX:+UseZGC -XX:MaxRAMPercentage=75"

EXPOSE 9090

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar expensetracker.jar"]
