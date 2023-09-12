import { Box, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddComment() {
  const [model, setModel] = useState<any>({});
  const baseApi = "https://jsonplaceholder.typicode.com/comments";
  const params = useParams();

  const getPostId = () => {
    axios
      .get(`${baseApi}/${params.id}`)
      .then((res) => {
        console.log(res);
        setModel({ ...res.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateComment = () => {
    axios
      .put(`${baseApi}/${params.id}`, model)
      .then((res) => {
        console.log("Post Successfully Added >>>> ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let submitData = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/comments", model)
      .then((res) => {
        console.log("Post Successfully Added >>>> ", res.data);
        setModel({ ...res.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (params.id) {
      getPostId();
    }
  }, []);

  return (
    <>
      <Box
        className="text-center bg-dark d-flex flex-column justify-content-center"
        sx={{ height: "100vh" }}
      >
        <h1 className="text-white">Add Comments</h1>
        
          <Box className="my-3">
            <input
              value={model.name}
              onChange={(e) => setModel({ ...model, name: e.target.value })}
              type="text"
              placeholder="Name"
              className="ps-2 py-1 rounded"
            />
          </Box>
          <Box className="my-3">
            <textarea
              value={model.body}
              onChange={(e) => setModel({ ...model, body: e.target.value })}
              placeholder="Body"
              className="ps-2 py-1 rounded"
            ></textarea>
          </Box>
          <Box className="my-3">
            {params.id ? (
              <Button variant="contained" onClick={updateComment}>
                Update comments
              </Button>
            ) : (
              <Button variant="contained" onClick={submitData}>
                Submit
              </Button>
            )}
          </Box>
        
      </Box>
    </>
  );
}
