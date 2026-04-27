-- BCrypt encoded passwords
-- user1 -> password: user123
-- admin1 -> password: admin123

INSERT INTO users (id, username, password, role) VALUES
(1, 'user1',  '$2a$10$BxqO98gIaHJNOOFD.XPiG.vtO6eBkXst5Dd2ZZ6DBuqVXwVrG4Hay', 'ROLE_USER'),
(2, 'admin1', '$2a$10$DCZKvIvvoCCk6SPvknW1ze4uGt61Z6jLAsIzFrzCRDN81PhIi6/em', 'ROLE_ADMIN');