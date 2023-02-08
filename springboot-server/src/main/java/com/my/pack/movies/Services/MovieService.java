package com.my.pack.movies.Services;

import com.my.pack.movies.Entities.Movie;
import com.my.pack.movies.Repositories.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> getById(ObjectId id) {
        return movieRepository.findById(id);
    }

    public Optional<Movie> getByImdbId(String id) {
        return movieRepository.findByImdbId(id);
    }
}
