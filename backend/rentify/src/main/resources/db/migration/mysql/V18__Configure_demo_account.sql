UPDATE users
SET password = '$2a$10$F8NgTjUepWPZURo1FLAwO.sBHlgbr9GFh0z3NrFLNeYEKcObOAdeC',
    status = 'ACTIVE',
    is_verify = TRUE
WHERE email = 'johndoe@example.com';
