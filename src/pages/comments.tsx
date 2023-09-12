import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Comments() {
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();

  const add = () => {
    navigate("/add");
  };

  const deletePost = (id: number) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then((res) => {
        console.log("Post deleted successfully ====>>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        console.log(res.data);
        setListData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box className="mb-5">
        <Typography variant="h3" className="text-center">Comments</Typography>
        <Box>
          <Box className="text-center">
            <Button variant="contained" onClick={add}>
              Add Comments
            </Button>
          </Box>
          {listData &&
            Array.isArray(listData) &&
            listData.length > 0 &&
            listData.map((x: any, i: number) => {
              return (
                <Box
                  key={i}
                  className="border border-4 border-primary m-4 p-4 bg-dark"
                >
                  <Typography variant="h5" className="my-5 text-white">
                    <span className="fw-bold text-info">Name: </span> {x.name}
                  </Typography>
                  <Typography variant="h5" className="my-5 text-white">
                    <span className="fw-bold text-info">Comment: </span> {x.body}
                  </Typography>
                  <Button
                    onClick={() => deletePost(x.id)}
                    className="text-danger"
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/add/${x.id}`);
                    }}
                    className="text-primaty"
                  >
                    <EditIcon />
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
}
