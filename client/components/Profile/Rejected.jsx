import React,{useState, useEffect} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';


export default function Rejected(props) {
    const { children, value, index, token, ...other } = props;
    const [Articles, setArticles] = useState("");

    const getArticles = async () => {
      console.log('calling');
      await fetch(`http://localhost:5000/api/v1/article/getRejectedArticles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setArticles(data.data);
        });
    };


    useEffect(() => {
      getArticles();
    });

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{marginTop:'45px'}}>
              <h1>Rejected content goes here</h1>
          </Box>
        )}
      </div>
    );
}

Rejected.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };