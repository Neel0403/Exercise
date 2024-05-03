import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { fetchData, exerciseOptions } from "../utils/fetchData";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scroll({ top: 1800, behaviour: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      {exercises.length > 0 ? ( // Check if exercises array is not empty
        <>
          <Typography variant="h3" mb="46px">
            Showing Results
          </Typography>
          <Stack
            direction="row"
            sx={{ gap: { lg: "110px", xs: "50px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {exercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </Stack>
          {exercises.length > exercisesPerPage && (
            <Stack mt="100px" alignItems="center">
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            </Stack>
          )}
        </>
      ) : (
        <Typography variant="h3">Loading...</Typography>
      )}
    </Box>
  );
};

export default Exercises;
