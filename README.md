Traval - Travel Experience Saver
=================================

Project structure created on 2025-11-03T08:25:50.899876 UTC.

Overview
--------
Simple Spring Boot backend + static frontend. People can submit travel experiences (place/city, title, details, author)
and other users can search by city or place name.

Setup (quick)
-------------
1. Make sure you have Java 17+ and Maven installed.
2. Make sure MySQL server is running on localhost.
3. Import SQL file: `database/traval_init.sql` into MySQL (or run it via MySQL Workbench).
4. Update credentials in `backend/src/main/resources/application.properties` if different.
   (Currently: user=root  password=1985  database=Traval)
5. Build and run backend:
   - cd backend
   - mvn clean package
   - mvn spring-boot:run
6. Serve frontend:
   - Option A: Keep static frontend files in `backend/src/main/resources/static/` (copy files there) and access at http://localhost:8080/index.html
   - Option B: Open `frontend/index.html` directly in your browser. The frontend will call backend at http://localhost:8080/api/experiences

Notes about the submit button issue
----------------------------------
Your problem (submit not working) is commonly because:
- the button is inside a form but has no event handler OR browser default form submission is navigating away.
Solution implemented:
- The frontend uses a button with `type="button"` and an explicit JS click handler that sends a POST `fetch()` to the backend.
- On success, the page shows "Feedback collected" and clears the form.

Files
-----
- frontend/: index.html, style.css, script.js
- backend/: full Spring Boot project (pom.xml, src/...)
- database/: traval_init.sql


## Deploying on Render with PostgreSQL

This project has been modified to use PostgreSQL and to be deployable on Render using Docker.

Key changes:
- `application.properties` now reads DB connection from environment variables:
  - `JDBC_DATABASE_URL` (example: `jdbc:postgresql://host:5432/dbname`)
  - `DB_USERNAME`
  - `DB_PASSWORD`
- `pom.xml` now uses the `org.postgresql:postgresql` driver.
- A `Dockerfile` was added at `AnswerSaverApp/backend/Dockerfile`.
- A `render.yaml` file was added as an example Render service configuration.

Steps to deploy:
1. Create a PostgreSQL instance on Render (Managed Databases) or elsewhere.
2. Set the environment variables on Render for `JDBC_DATABASE_URL`, `DB_USERNAME`, `DB_PASSWORD`.
3. Deploy the service with the provided Dockerfile (Render will build the image).
