# Healthcare Expo - Spring Boot Backend

RESTful backend service built with Spring Boot, Spring Security, Spring Data JPA, and H2/MySQL for The Global Healthcare Expo web application.

---

## 🚀 Quick Start

### 1. Requirements
* Java JDK 17 or 21 (LTS)
* Maven (or use included `./mvnw`)

### 2. Run the Backend
From this directory (`healthcare backend/`):
```bash
# On Windows PowerShell / Command Prompt:
.\mvnw.cmd spring-boot:run

# Or if you have Maven installed globally:
mvn spring-boot:run
```

The server starts on **`http://localhost:8080`**.

---

## 🗄️ Database Configuration

By default, an **in-memory H2 database** is active for zero-configuration, instant setup.
* **H2 Console URL**: `http://localhost:8080/h2-console`
* **JDBC URL**: `jdbc:h2:mem:healthcaredb`
* **User**: `sa`
* **Password**: *(leave blank)*

### Switching to MySQL
To use MySQL, open `src/main/resources/application.properties` and uncomment the MySQL section:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/healthcare_expo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
* `POST /api/auth/login` - Authenticate user (Admin, Visitor, Exhibitor)
* `POST /api/auth/signup` - Register a new account

### Visitors (`/api/visitors`)
* `GET /api/visitors` - List all registered trade visitors
* `POST /api/visitors` - Register a new visitor pass
* `DELETE /api/visitors/{id}` - Remove a visitor

### Exhibitors (`/api/exhibitors`)
* `GET /api/exhibitors` - List all exhibitor booth bookings
* `POST /api/exhibitors` - Book an exhibition stall
* `PUT /api/exhibitors/{id}/status` - Update booking status
* `DELETE /api/exhibitors/{id}` - Remove an exhibitor booking

### Sponsorships (`/api/sponsorships`)
* `GET /api/sponsorships` - List sponsorship packages
* `POST /api/sponsorships` - Create a sponsorship proposal
* `PUT /api/sponsorships/{id}/status` - Update sponsorship status

### Contact Inquiries (`/api/contact`)
* `POST /api/contact` - Submit contact inquiry message
* `GET /api/contact` - Retrieve all submitted messages

### Health Check (`/api/health`)
* `GET /api/health` - Check backend service uptime

---

## 🔄 Automatic Initial Data Seeding
On first startup, the database automatically seeds:
* **Admin Account:** `admin@globalhealthcareexpo.com` / `Admin@Expo2026`
* **Demo Visitor:** `visitor@example.com` / `visitor123`
* **Demo Exhibitor:** `exhibitor@apexbio.com` / `exhibitor123`
* Sample trade visitors, exhibitors, and sponsorship records.
