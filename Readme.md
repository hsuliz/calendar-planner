# Calendar app

## Jak odpalić aplikację

### Czego potrzebujemy

-  [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
-  [node.js](https://nodejs.org/en/download/) (LTS, v14 lub więcej)
-  [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Jak zainicjować projekt

-  zaciągamy najnowsze zmiany z gita
-  uruchamiamy bazę poprzez `docker-compose up -d` w folderze app
-  przechodzimy do folderu `app/front/`
-  wykonujemy komendę `npm ci`

Ten proces musimy powtórzyć za każdym razem, kiedy ktoś doda nową paczkę do projektu frontowego

<hr />

### Jak uruchomić projekt

-  przechodzimy do folderu `app/api/`
-  wykonujemy komendę `./mvnw spring-boot:run`
-  przechodzimy do folderu `app/front/`
-  wykonujemy komendę `npm start`

Dev server powinien się odpalić na localhost:3000
