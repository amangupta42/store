-- Seed file for Turso database
-- Run with: turso db shell <your-db-name> < prisma/seed.sql

-- Clean existing data
DELETE FROM ProductCategory;
DELETE FROM Product;
DELETE FROM Category;
DELETE FROM "Order";

-- Insert Categories
INSERT INTO Category (id, name, slug, image) VALUES
  ('cat_sofas', 'Sofas', 'sofas', '/categories/sofas.jpg'),
  ('cat_chairs', 'Chairs', 'chairs', '/categories/chairs.jpg'),
  ('cat_living_room', 'Living Room', 'living-room', '/categories/living-room.jpg'),
  ('cat_new_arrivals', 'New Arrivals', 'new-arrivals', '/categories/new-arrivals.jpg'),
  ('cat_on_sale', 'On Sale', 'on-sale', '/categories/on-sale.jpg');

-- Insert Products
INSERT INTO Product (id, name, slug, description, price, image, stock, featured, createdAt, updatedAt) VALUES
  ('prod_1', 'Timber Gray Sofa', 'timber-gray-sofa', 'Stay a while. The Timber charme chocolat sofa is set atop an oak trim and flaunts fluffy leather back and seat cushions.', '1000.00', '/products/couch1.png', 10, 1, datetime('now'), datetime('now')),
  ('prod_2', 'Galaxy Blue Sofa', 'galaxy-blue-sofa', 'Easy to love. The Sven in birch ivory looks cozy and refined, like a sweater that a fancy lady wears on a coastal vacation.', '800.00', '/products/couch2.png', 43, 1, datetime('now'), datetime('now')),
  ('prod_3', 'Markus Green Love Seat', 'markus-green-love-seat', 'You know your dad''s incredible vintage bomber jacket? The Nirvana dakota tan leather sofa is that jacket, but in couch form.', '900.00', '/products/couch3.png', 2, 0, datetime('now'), datetime('now')),
  ('prod_4', 'Dabit Matte Black', 'dabit-matte-black', 'You don''t have to go outside to be rugged. Features a sturdy corner-blocked wooden frame and raw seams.', '1200.00', '/products/couch4.png', 14, 0, datetime('now'), datetime('now')),
  ('prod_5', 'Carmel Brown Sofa', 'carmel-brown-sofa', 'Full-aniline upholstery will develop a worn-in vintage look. Natural color variations and wrinkles are part of the unique characteristics.', '1000.00', '/products/couch5.png', 2, 1, datetime('now'), datetime('now')),
  ('prod_6', 'Mod Leather Sofa', 'mod-leather-sofa', 'Tufted bench seat, loose back pillows and bolsters, solid walnut legs, ready to make your apartment the adult oasis you dream of.', '800.00', '/products/couch6.png', 8, 0, datetime('now'), datetime('now')),
  ('prod_7', 'Thetis Gray Love Seat', 'thetis-gray-love-seat', 'Super-plush down-filled cushions, a corner-blocked wooden frame, and a leather patina that only gets better with age.', '900.00', '/products/couch7.png', 10, 0, datetime('now'), datetime('now')),
  ('prod_8', 'Sven Tan Matte', 'sven-tan-matte', 'Sturdy corner-blocked wooden frame and raw seams for that vintage look. Becomes more beautiful with use.', '1200.00', '/products/couch8.png', 7, 0, datetime('now'), datetime('now')),
  ('prod_9', 'Otis Malt Sofa', 'otis-malt-sofa', 'Cozy in a cottage, cabin, or a condo. The leather becomes more beautiful with use showing character markings.', '500.00', '/products/couch9.png', 13, 0, datetime('now'), datetime('now')),
  ('prod_10', 'Ceni Brown 3 Seater', 'ceni-brown-3-seater', 'Features a sturdy corner-blocked wooden frame. Subtle character markings such as insect bites and grain variation.', '650.00', '/products/couch10.png', 9, 0, datetime('now'), datetime('now')),
  ('prod_11', 'Jameson Jack Lounger', 'jameson-jack-lounger', 'Perfect for lounging with a book or taking afternoon naps. Premium leather construction with exceptional comfort.', '1230.00', '/products/couch11.png', 24, 1, datetime('now'), datetime('now')),
  ('prod_12', 'Timber Charcoal Chair', 'timber-charcoal-chair', 'Modern accent chair with clean lines and comfortable cushioning. Perfect for any room.', '350.00', '/products/chair1.png', 15, 0, datetime('now'), datetime('now')),
  ('prod_13', 'Elegance Wing Chair', 'elegance-wing-chair', 'Classic wingback design with contemporary flair. Ideal for reading nooks.', '450.00', '/products/chair2.png', 8, 0, datetime('now'), datetime('now')),
  ('prod_14', 'Modern Velvet Chair', 'modern-velvet-chair', 'Luxurious velvet upholstery on a sleek metal frame. Statement piece for modern interiors.', '520.00', '/products/chair3.png', 12, 1, datetime('now'), datetime('now'));

-- Insert Product-Category relationships
INSERT INTO ProductCategory (productId, categoryId) VALUES
  -- Timber Gray Sofa
  ('prod_1', 'cat_sofas'),
  ('prod_1', 'cat_new_arrivals'),

  -- Galaxy Blue Sofa
  ('prod_2', 'cat_sofas'),

  -- Markus Green Love Seat
  ('prod_3', 'cat_sofas'),
  ('prod_3', 'cat_new_arrivals'),

  -- Dabit Matte Black
  ('prod_4', 'cat_sofas'),
  ('prod_4', 'cat_on_sale'),

  -- Carmel Brown Sofa
  ('prod_5', 'cat_sofas'),
  ('prod_5', 'cat_living_room'),

  -- Mod Leather Sofa
  ('prod_6', 'cat_sofas'),
  ('prod_6', 'cat_new_arrivals'),

  -- Thetis Gray Love Seat
  ('prod_7', 'cat_sofas'),
  ('prod_7', 'cat_new_arrivals'),

  -- Sven Tan Matte
  ('prod_8', 'cat_sofas'),
  ('prod_8', 'cat_on_sale'),

  -- Otis Malt Sofa
  ('prod_9', 'cat_sofas'),
  ('prod_9', 'cat_on_sale'),

  -- Ceni Brown 3 Seater
  ('prod_10', 'cat_sofas'),
  ('prod_10', 'cat_on_sale'),

  -- Jameson Jack Lounger
  ('prod_11', 'cat_sofas'),
  ('prod_11', 'cat_living_room'),

  -- Timber Charcoal Chair
  ('prod_12', 'cat_chairs'),
  ('prod_12', 'cat_living_room'),

  -- Elegance Wing Chair
  ('prod_13', 'cat_chairs'),
  ('prod_13', 'cat_new_arrivals'),

  -- Modern Velvet Chair
  ('prod_14', 'cat_chairs'),
  ('prod_14', 'cat_new_arrivals');
