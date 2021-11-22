import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Add_Data, Delete_Data, Edit_Data } from "./Actions/action";
function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add your Blog post
          </Typography>

          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default function Addblog() {
  const [getTitle, setTitle] = useState("");
  const [getPost, setPost] = useState("");
  const [getTitleedit, setTitleedit] = useState("");
  const [getPostedit, setPostedit] = useState("");
  const [showedit, setshowedit] = useState(false);
  const [indexvalue, setindexvalue] = useState("");
  const dispatch = useDispatch();
  let list = useSelector((state) => state.blogReducer.blog);

  console.log(
    "list",
    list.map((item) => {
      return item;
    })
  );
  const handleSubmit = () => {
    // alert("click");
    var body = {
      title: getTitle,
      post: getPost,
    };
    dispatch(Add_Data(body));
    setTitle("");
    setPost("");
  };
  const handle_Edit = (item, index) => {
    setshowedit(true);
    console.log("index", index);
    setindexvalue(index);
    setTitleedit(item.data.title);
    setPostedit(item.data.post);
  };

  const handleupdate = (item) => {
    var body = {
      // id: item.id,
      title: getTitleedit,
      post: getPostedit,
    };

    dispatch(Edit_Data({ id: item.id, body }));
    setshowedit(false);
  };
  return (
    <div>
      {ButtonAppBar()}
      <Container maxWidth="lg">
        <Grid>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Blog title"
              variant="outlined"
              value={getTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              id="outlined-multiline-static"
              label="Blog post"
              multiline
              rows={4}
              value={getPost}
              onChange={(e) => setPost(e.target.value)}
            />
          </FormControl>
          <br />
          <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Grid>

        {list.map((item, index) => {
          return (
            <>
              {index === indexvalue ? (
                <Grid item xs={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <div>
                        {" "}
                        <TextField
                          id="outlined-basic"
                          label="Blog post"
                          variant="outlined"
                          value={getTitleedit}
                          onChange={(e) => setTitleedit(e.target.value)}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Blog post"
                          variant="outlined"
                          value={getPostedit}
                          sx={{ ml: 1 }}
                          onChange={(e) => setPostedit(e.target.value)}
                        />
                        <Button
                          sx={{ m: 1 }}
                          variant="contained"
                          onClick={() => handleupdate(item)}
                        >
                          Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ) : (
                <div>
                  <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Title {item.data.title}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Blog {item.data.post}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          type="button"
                          sx={{ m: 1 }}
                          variant="contained"
                          onClick={() => handle_Edit(item, index)}
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ m: 1 }}
                          variant="contained"
                          onClick={() => dispatch(Delete_Data(item.id))}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </div>
              )}
            </>
          );
        })}
        {/* </Card>
        </Grid> */}
      </Container>
    </div>
  );
}
