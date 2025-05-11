INSERT INTO dress (id, name, description, price, size, color, quantity, image_url) VALUES
(1, 'Lace Dress', 'Beautiful lace dress for parties', 1200.0, 'M', 'Brown', 5, 'i4.jpg'),
(2, 'Maxi Dress', 'Rainbow maxi for summer', 1800.0, 'L', 'Multi', 4, 'maxi.jpg'),
(3, 'Men Jacket', 'Stylish maroon jacket for winter', 2500.0, 'XL', 'Maroon', 6, 'men8.jpg'),
(4, 'White Top', 'Trendy white top for casual wear', 850.0, 'S', 'White', 10, 'w.jpg'),
(5, 'Floral Dress', 'Printed floral dress perfect for outings', 1500.0, 'M', 'White/Black', 7, 'w1.jpg'),
(6, 'Green Shirt', 'Formal green shirt for women', 1300.0, 'M', 'Green', 8, 'w2.jpg'),

(8, 'Pink Sweater', 'Cozy pink winter sweater', 1600.0, 'XL', 'Pink', 9, 'w4.jpg'),
(9, 'Yellow Dress', 'Vibrant yellow dress for spring', 1400.0, 'M', 'Yellow', 5, 'w8.jpg'),
(10, 'Wrap Dress', 'Stylish black wrap dress', 1700.0, 'S', 'Black', 3, 'wrap.jpg');
INSERT INTO dress (id, name, description, price, size, color, quantity, image_url) VALUES
(11, 'Red Evening Gown', 'Elegant red evening gown for parties', 2500.0, 'S', 'Red', 5, 'evening_gown.jpg'),
(12, 'Black Leather Jacket', 'Classic black leather jacket for winter', 3200.0, 'M', 'Black', 8, 'leather_jacket.jpg'),
(13, 'Floral Summer Dress', 'Light and breezy floral dress for summer outings', 1300.0, 'M', 'Floral', 10, 'floral_summer.jpg'),
(14, 'Tartan Skirt', 'Trendy tartan skirt for casual wear', 900.0, 'S', 'Red/Black', 6, 'tartan_skirt.jpg'),
(15, 'Denim Jacket', 'Casual denim jacket for cool evenings', 1800.0, 'L', 'Blue', 7, 'denim_jacket.jpg'),
(16, 'Beige Pants', 'Comfortable beige pants for daily wear', 1200.0, 'M', 'Beige', 9, 'beige_pants.jpg'),
(17, 'Black Pencil Skirt', 'Professional black pencil skirt for office wear', 1400.0, 'S', 'Black', 8, 'pencil_skirt.jpg'),
(18, 'White Sneakers', 'Classic white sneakers for casual wear', 1000.0, 'M', 'White', 12, 'white_sneakers.jpg'),
(19, 'Gray Hoodie', 'Comfortable gray hoodie for casual days', 1600.0, 'M', 'Gray', 5, 'gray_hoodie.jpg'),
(20, 'Chiffon Blouse', 'Elegant chiffon blouse for formal wear', 2200.0, 'L', 'White', 4, 'chiffon_blouse.jpg');

INSERT INTO users(name, phone_number, age, mail_id) VALUES
('Priya Dharshini', '9876543210', 23, 'priya@example.com'),
('Rahul Sharma', '9123456780', 28, 'rahul@example.com'),
('Anjali Mehta', '9001234567', 25, 'anjali@example.com'),
('Vikram Kumar', '8899776655', 30, 'vikram@example.com');



INSERT INTO cart (user_id, dress_id, quantity) VALUES 
(1, 1, 2),
(2, 2, 1);
