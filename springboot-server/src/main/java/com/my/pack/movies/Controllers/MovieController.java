package com.my.pack.movies.Controllers;

import com.my.pack.movies.Entities.Movie;
import com.my.pack.movies.Services.MovieService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping
    public ResponseEntity<List<Movie>> getMovies(){
        return new ResponseEntity<List<Movie>>(movieService.allMovies(),HttpStatus.OK);
    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<Optional<Movie>> getById(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Movie>>(movieService.getById(id),HttpStatus.OK);
    }
    @GetMapping("/getByImdbId/{imdbId}")
    public ResponseEntity<Optional<Movie>> getByImdbId(@PathVariable String imdbId){
        System.out.println("what");
        return new ResponseEntity<Optional<Movie>>(movieService.getByImdbId(imdbId),HttpStatus.OK);
    }
}
