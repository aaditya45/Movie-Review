package com.my.pack.movies.Controllers;


import com.my.pack.movies.Entities.Review;
import com.my.pack.movies.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping()
    public ResponseEntity<Review> createReview(@RequestBody Map<String,String> payload){
        System.out.println(payload.get("reviewBody"));
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"),payload.get("imdbId")), HttpStatus.OK);
    }
}
