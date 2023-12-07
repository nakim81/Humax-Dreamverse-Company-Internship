FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} parking-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/parking-0.0.1-SNAPSHOT.jar"]

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime