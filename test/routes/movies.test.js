require("dotenv").config();
const server = require("../helper");

// test skip because limit API
const fastify = server();
test("Get data naruto movies from omdb api ", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/movies/s/naruto",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length > 1).toBeTruthy();
  expect(res.json().data[0].Title).toBeDefined();
});

test("Get detail movies with imdbID", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/movies/d/tt0988824",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data).toBeDefined();
  expect(res.json().data).toEqual(
    expect.objectContaining({
      Title: "Naruto: Shippûden",
      Year: "2007–2017",
      Rated: "TV-PG",
      Released: "28 Oct 2009",
      Runtime: "24 min",
      Genre: "Animation, Action, Adventure, Comedy, Drama, Fantasy",
      Director: "N/A",
      Writer: "Masashi Kishimoto",
      Actors: "Junko Takeuchi, Maile Flanagan, Kate Higgins, Chie Nakamura",
      Plot:
        "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.",
      Language: "English, Japanese",
      Country: "Japan",
      Awards: "2 wins & 8 nominations.",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTE5NzIwMGUtYTE1MS00MDUxLTgyZjctOWVkZDAxM2M4ZWQ4XkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.6/10",
        },
      ],
      Metascore: "N/A",
      imdbRating: "8.6",
      imdbVotes: "81,274",
      imdbID: "tt0988824",
      Type: "series",
      totalSeasons: "24",
      Response: "True",
    })
  );
});
