import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";



const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);
  const [createPlot, { data: createPlotData, loading: createPlotLoading, error: createPlotError }] = useMutation(CREATE_PLOT);

  const handleCreatePlot = async () => {
    createPlot({
      variables: {
        plotData: {}
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1>Your Plots</h1>
      {data.getPlots.map((plot) => (
        <PlotCard key={plot.id} plot={plot} />
      ))}
      <button onClick={handleCreatePlot}>Create Plot</button>
    </div>
  );
};

export default ProfilePage;
