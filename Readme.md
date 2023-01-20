# Calendar app

## Jak odpalić aplikację frontową

### Czego potrzebujemy

- Java 17
- [node.js](https://nodejs.org/en/download/) (LTS, v14 lub więcej)
- Bazy danych PostgreSQL.

### Jak zainicjować projekt

- zaciągamy najnowsze zmiany z gita
- uruchamiamy baze `docker-compose up -d`
- przechodzimy do folderu `app/api/`
- wykonujemy komendę `./mvnw spring-boot:run`
- przechodzimy do folderu `app/front/`
- wykonujemy komendę `npm ci`

Ten proces musimy powtórzyć za każdym razem, kiedy ktoś doda nową paczkę do projektu frontowego

<hr />

### Jak uruchomić development server

- przechodzimy do folderu `app/front/`
- wykonujemy komendę `npm start`

Dev server powinien się odpalić na localhost:3000
