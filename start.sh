#!/bin/bash

# Docker servisleri başlat
docker-compose up -d

# Backend'i başlat
cd src/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

# Frontend'i başlat
cd ../..
npm start 