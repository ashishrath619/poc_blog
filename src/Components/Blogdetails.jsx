import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Blogdetails(props) {
  const [getData, setData] = useState([]);
  const [showcmnt, setshowcmnt] = useState(false);

  var data = props.history.location.data;
  const Fetchcomments = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
      .then((response) => response.json())
      .then((result) => setData(result));
  };

  useEffect(() => {
    console.log("propsdata", props);
    Fetchcomments();
  }, []);

  const showcomment = () => {
    setshowcmnt(true);
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Blog Title- {data.title}
          </Typography>
          {/* <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography> */}
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Blog post-
          </Typography>
          <Typography variant="body2">
            {data.body}
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={showcomment}>
            View Comments
          </Button>
        </CardActions>

        {showcmnt
          ? getData.map((cmnt) => {
              return (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5 }}
                    color="text.primary"
                  >
                    User- {cmnt.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                  >
                    Comment- {cmnt.body}
                  </Typography>
                </>
              );
            })
          : null}
      </Card>
    </>
  );
}
