-- DROP TABLE movies;
-- CREATE TABLE movies(
--   imdbid VARCHAR(10) PRIMARY KEY NOT NULL,
--   data JSON
-- );
-- DELETE FROM movies_review WHERE id < 19;
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
-- CREATE DATABASE movies_review_test;
-- CREATE TABLE movies (
--   Title VARCHAR(50),
--   Year VARCHAR(10),
--   Rated VARCHAR(10),
--   Released VARCHAR(10),
--   Runtime VARCHAR(10),
--   Genre VARCHAR(200),
--   Director VARCHAR(25),
--   Writer VARCHAR(25),
--   Actors VARCHAR(200),
--   Plot VARCHAR(225),
--   Language VARCHAR(50),
--   Country VARCHAR(15),
--   Awards VARCHAR(50),
--   Poster VARCHAR(100),
--   Ratings JSON,
--   Metascore VARCHAR(100),
--   imdbRating FLOAT,
--   imdbVotes FLOAT,
--   imdbID VARCHAR(10) PRIMARY KEY,
--   Type VARCHAR(10),
--   totalSeasons INTEGER,
--   Response BOOLEAN
-- );