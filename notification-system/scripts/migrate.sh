#!/bin/bash

# This script is for migrating the database schema for the notification system.

# Exit immediately if a command exits with a non-zero status
set -e

# Define the database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="your_username"
DB_PASSWORD="your_password"
DB_NAME="notification_system"

# Run the migration command
echo "Starting database migration..."

# Example migration command (replace with actual migration tool command)
# psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations/schema.sql

echo "Database migration completed successfully."