import React,{useState,useEffect} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import Table from "../PushBackTable";
import TextField from "@mui/material/TextField";

export default function Pushback(props) {
  const { children, value, index, token, ...other } = props;
  const [Articles, setArticles] = useState("");

  const getArticles = async () => {
    await fetch(`http://localhost:5000/api/v1/article/getPushbackArticles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const columns = [
    {
      id: "coverImage",
      label: "Cover Image",
      minWidth: 100,
      align: "center",
    },
    {
      id: "title",
      label: "Title",
      minWidth: 270,
      align: "left",
    },
    {
      id: "pushBackNotes",
      label: "Push Back Notes",
      minWidth: 170,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="m-3 py-3 ">
          <center>
            {console.log(Articles)}
            {Articles ? (
              <Table
                columns={columns}
                rows={Articles}
                action={true}
                // update={setUpdateCoubnt}
              />
            ) : (
              <h4>There are no articles in pushback</h4>
            )}
          </center>
        </div>
      )}
    </div>
  );
}

Pushback.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };