import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlotCard from "../components/PlotCard";
import AddPlot from "../components/AddPlot";
import { GET_PLOTS, GET_JOBS, DELETE_JOB_MUTATOIN } from "../utils/mutations";
import { useAuth } from "../utils/AuthContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const plusIcon = <FontAwesomeIcon icon={faPlus} />;

const JobsPage =() => {
    const { loading, error, data } = useQuery(GET_JOBS, GET_PLOTS);
    const [showAddPlotModal, setShowAddPlotModal] = useState(false);
    const [selectedPlot, setSelectedPlot] = useState(null);
    
    const toggleAddPlotModal = (plot) => {
        setSelectedPlot(plot);
        setShowAddPlotModal(!showAddPlotModal);
    };
    
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
            <PlotCard key={job.id} job={job} onClick={() => toggleAddPlotModal(job)} />
        ))}
        </div>
        </div>
    );
}

export default JobsPage;