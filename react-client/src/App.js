import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';


/*
backdrops
genres
id
imdbId
poster
releaseDate
reviewIds
title
trailerLink
*/


//main screen
const App = () => {
  //hooks
  const [movies, setMovies] = useState([]);
  const [screen, setScreen] = useState(false);
  const [movie, setMovie] = useState();

  useEffect(() => {
    getMovies();
  }, [])
  //functions
  const getMovies = () => {
    return axios.get("http://localhost:8080/movies").then((response) => {
      console.log(response.data);
      setMovies(response.data)
    });
  }

  const showScreen = () => {
    console.log(screen);
    if (screen) setScreen(false);
    else setScreen(true);

  }

  const movieClicked = (movie) => {
    setMovie(movie);
  }

  //component
  return (
    <div >
      {screen === false && movies.length !== 0 && <List movies={movies} showScreen={showScreen} movieClicked={movieClicked} />}
      {screen === true && <ReviewScreen showScreen={showScreen} movie={movie} getMovies={getMovies}/>}
    </div>
  )
}

//List component starts
const List = ({ movies, showScreen, movieClicked }) => {
  const header_style = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "height": "50px",
    "background-color": "gold"
  }
  const header_text = {
    "font-size": "35px",
    "color": "black",
    "font-weight": "bold",
    "marginRight": "15px",
  }
  return (
    <div>
      <header style={header_style}>
        <h1 style={header_text}>Movie Review</h1>
      </header>
      <h1 style={{
        marginLeft: "20px",
        marginTop: "20px",
        color: "white"
      }}>Express what you felt!</h1>
      {
        movies.map((movie) => {
          return (
            <table>
              <tr>
                <td>
                  <ListElement
                    movie={movie}
                    showScreen={showScreen}
                    movieClicked={movieClicked}
                  ></ListElement>
                </td>

              </tr>
            </table>
          )
        })
      }

    </div>
  )
}

//List element component starts
const ListElement = ({ movie, showScreen, movieClicked }) => {
  const block_style = {
    "margin": "25px",
    "padding": "5px",
    "width": "100%",
    "border-radius": "25px",
    "box-shadow": "10px 5px 5px black",
    "color": "white",
    "fontSize": "40px"
  }
  const img_style = {
    "height": "200px",
    "border": "3px solid white",
    "border-top-left-radius": "15px",
    "border-bottom-left-radius": "15px",
    "margin-right": "30px"
  }
  const on_click = () => {
    movieClicked(movie);
    showScreen();
  }
  return (
    <div style={block_style} onClick={on_click}>
      <img style={img_style} src={movie.poster}></img>
      {movie.title}
    </div>
  )
}


//Review screen component
const ReviewScreen = ({ showScreen, movie ,getMovies}) => {
  const [validation,setValidation]=useState("");
  const [review,setReview]=useState("");
  const [reviews,setReviews]=useState([]);
  const [render,setRender]=useState(false);
  useEffect(()=>{
    //console.log("please");
    getAllReviews();
  },[]);
  const block_style = {
    "color": "white"
  }
  const header_style = {
    "display": "flex",
    // "justify-content": "center",
    // "align-items": "center",
    "height": "50px",
    "background-color": "gold"
  }
  const header_text = {
    "font-size": "35px",
    "font-weight": "bold",
    "marginRight": "15px",

  }
  const back = () => {
    showScreen();
  }
  const getAllReviews=()=>{
    var arr=[]
    movie.reviewIds.map((review)=>{
      arr.push(review.body);
    })
    setReviews(arr);
  }
  const reviewBodyFunction=(ev)=>{
    setReview(ev.target.value);
  }
  
  const submitReview=()=>{

    if(review.length==0 || review==null){
      setValidation("Please write the review before submitting.");
      return;
    }
    var data={
      "reviewBody":review,
      "imdbId":movie.imdbId
    }
    axios.post('http://localhost:8080/reviews', data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    document.getElementById("reviewError").innerHTML="";
    document.getElementById("reviewTextArea").innerHTML="";
    setReview("");
    console.log('yep');
    var arr=reviews;
    arr.push(review);
  }
  
  return (
    <div style={block_style}>
      <header style={header_style}>
        <FontAwesomeIcon icon={faArrowLeft} style={{
          "marginRight": "15px",
          "marginLeft": "15px",
          "marginTop": "5px",
          "fontSize": "35px",
          "text-shadow": "1px 1px black"
        }} onClick={back} />
        <h1 style={header_text}>{movie.title}</h1>
      </header>
      <div style={{
        "margin": "20px",
        "fontSize": "40px",
        "fontWeight": "bold",
      }}>
        Write Review
      </div>
      <div style={{
        "margin": "20px",

      }}>
        <table >
          <tr>
            <td>
              <img src={movie.poster} style={{ "height": "600px" }}></img>
            </td>
            <td style={{"vertical-align": "top",}}>
              {/* reviews */}
              <div style={{
                marginLeft:"70px"
              }}>
                
                 <h2>Write review:</h2>
                 <br></br>
                 <span style={{color:"red"}}id="reviewError">{validation}</span>
                 <br></br>
                  <textarea id="reviewTextArea" value={review} style={{ "height": "100px", "width": "600px","resize": "none" ,background:"black",color:"white"}}name="reviewBody" onChange={reviewBodyFunction}></textarea>
                  <br></br>
                  <Button onClick={submitReview} variant="outlined">Submit</Button>
                <h2>Reviews:</h2>
                <table>
                  <tbody>
                    {
                      reviews.map((review) => {
                        return (
                          <tr>
                            <td>
                              <b>USER:</b> {review}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
               
                
              </div>

            </td>
          </tr>
        </table>



      </div>

    </div>
  )
}

export default App;