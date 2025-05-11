DROP TABLE IF EXISTS dress;

CREATE TABLE dress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(500),
    price DOUBLE,
    size VARCHAR(20),
    color VARCHAR(50),
    quantity INT,
    image_url VARCHAR(500)
);




CREATE TABLE IF NOT EXISTS users (
    id IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    phone_number VARCHAR(20),
    age INT,
    mail_id VARCHAR(100)
);







CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    dress_id INT,
    quantity INT
);
