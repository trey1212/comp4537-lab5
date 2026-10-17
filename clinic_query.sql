CREATE DATABASE IF NOT EXISTS lab5_clinic;

-- Create admin user and give them CREATE, INSERT, and SELECT priveleges
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin_password123';
GRANT CREATE, INSERT, SELECT ON lab5_clinic.* TO 'admin'@'localhost';

-- Create reader user and make them read only
CREATE USER 'reader'@'localhost' IDENTIFIED BY 'reader_password123';
GRANT SELECT ON lab5_clinic.* TO 'reader'@'localhost';

FLUSH PRIVILEGES;