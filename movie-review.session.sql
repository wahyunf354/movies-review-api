-- CREATE TABLE movies_review (
--   id SERIAL NOT NULL PRIMARY KEY,
--   imdbID VARCHAR(10) NOT NULL,
--   review VARCHAR(200) NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );
-- INSERT INTO movies_review(imdbID, review)
-- VALUES ('tt0988824', 'keren')
-- RETURNING id;
CREATE DATABASE movies_review_test;