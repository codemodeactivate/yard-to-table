import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import JobCard from "../components/PlotCard";
import { GET_JOBS, DELETE_JOB_MUTATOIN } from "../utils/mutations";
import { useAuth } from "../utils/AuthContext";


const JobsPage = () => {
  const { loading, error, data } = useQuery(GET_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1 className="text-4xl text-yard-red text-center my-8">Your Jobs</h1>
      <div className="plot-list flex space-x-4 flex-wrap justify-center">
        {data.getJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
