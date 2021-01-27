CREATE TABLE movies_review (
  id SERIAL NOT NULL PRIMARY KEY,
  imdbID INTEGER NOT NULL,
  review VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);