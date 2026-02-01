# Standalone Setup Guide

## Quick Start - Run Everything in 3 Steps

### Prerequisites
- Docker Desktop installed and running

### Step 1: Download Files
You need only **one file**:
- `docker-compose.standalone.yml`

**Note**: No `.env` file needed! The frontend is pre-built with nginx and directly calls the backend without requiring environment variables.

### Step 2: Run Application
```bash
docker-compose -f docker-compose.standalone.yml up -d
```

Wait 15-20 seconds for all services to start.

### Step 3: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **MongoDB**: localhost:27017

---

## Commands

### View Logs
```bash
docker-compose -f docker-compose.standalone.yml logs -f
```

### Stop Application
```bash
docker-compose -f docker-compose.standalone.yml down
```

### Restart Application
```bash
docker-compose -f docker-compose.standalone.yml restart
```

### Reset Everything (Delete Database)
```bash
docker-compose -f docker-compose.standalone.yml down -v
docker-compose -f docker-compose.standalone.yml up -d
```

---

## Services Included

| Service | Port | Purpose |
|---------|------|---------|
| Frontend | 5173 | React UI (nginx) |
| Backend | 8080 | API Server |
| MongoDB | 27017 | Database |

**Frontend Configuration**: The frontend Docker image is pre-built with nginx and has the backend API URL baked in during build time. No environment variables are needed at runtime - the frontend directly calls the backend through nginx.

---

## Troubleshooting

### Port Already in Use
Change ports in docker-compose.standalone.yml:
```yaml
ports:
  - "3000:80"      # Use 3000 instead of 5173
```

### Services Won't Start
```bash
# Check logs
docker-compose -f docker-compose.standalone.yml logs

# Restart Docker
docker restart
```

### Database Connection Issues
```bash
# Remove volumes and restart
docker-compose -f docker-compose.standalone.yml down -v
docker-compose -f docker-compose.standalone.yml up -d
```

---

## Environment Variables

Default credentials are set in `docker-compose.standalone.yml`. To change:

- `JWT_SECRET`: Change this for security
- `MAIL_USER`: Your Gmail address
- `MAIL_PASS`: Your Gmail app password
- `FRONTEND_URL`: Frontend URL for backend

---

## Done!
Your entire SaaS Notes application is now running!
