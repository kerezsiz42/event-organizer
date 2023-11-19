FROM amazoncorretto:21-alpine3.18 as build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .
RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw package -DskipTests

FROM amazoncorretto:21-alpine3.18
WORKDIR /app
COPY --from=build /app/target/szisz-event-organizer.jar /app/szisz-event-organizer.jar
COPY application.properties /app/application.properties
CMD ["java", "-jar", "szisz-event-organizer.jar"]