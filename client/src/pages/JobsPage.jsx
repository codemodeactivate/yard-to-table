import React from "react";
import { gql, useQuery } from "@apollo/client";
import JobCard from "../components/JobCard";
import { GET_JOBS, GET_HOMEOWNERS, GET_ALL_GARDENERS, GET_PLOTS, DELETE_JOB_MUTATOIN } from "../utils/mutations";
import { useAuth } from "../utils/AuthContext";

const JobsPage = () => {
  const { loading: loadingHomeowners, error: errorHomeowners, data: homeownersData } = useQuery(GET_HOMEOWNERS);
  const { loading: loadingJobs, error: errorJobs, data: jobsData } = useQuery(GET_JOBS);
  const { loading: loadingGardeners, error: errorGardeners, data: gardenersData } = useQuery(GET_ALL_GARDENERS);
  const { loading: loadingPlots, error: errorPlots, data: plotsData } = useQuery(GET_PLOTS);

  if (loadingHomeowners || loadingJobs || loadingGardeners || loadingPlots) return <p>Loading...</p>;
  if (errorHomeowners || errorJobs || errorGardeners || errorPlots) {
    return <p>Error :(</p>;
  }

  const homeowners = homeownersData?.getAllHomeowners || [];
  const gardeners = gardenersData?.getAllGardeners || [];
  const plots = plotsData?.getPlots || [];
  const jobs = jobsData?.getJobs || [];

  const getHomeownerName = (homeownerId) => {
    const homeowner = homeowners.find((homeowner) => homeowner._id === homeownerId);
    return homeowner ? homeowner.name : "Unknown";
  };

    const getGardenerName = (gardenerId) => {
        const gardener = gardeners.find((gardener) => gardener._id === gardenerId);
        return gardener ? gardener.name : "Unknown";
    };

    const getPlotName = (plotId) => {
        const plot = plots.find((plot) => plot._id === plotId);
        return plot ? plot.name : "Unknown";
    };

    const getJobsName = (jobId) => {
        const job = jobs.find((job) => job._id === jobId);
        return job ? job.name : "Unknown";
    };

    return (
        <div>
            <h1 className="text-4xl text-yard-red text-center my-8">Jobs</h1>
            <div className="job-list flex space-x-4 flex-wrap justify-center">
                {jobsData.getJobs.map((job) => (
                    <JobCard key={job._id} job={job} homeowners={homeowners} gardeners={gardeners} plots={plots} />
                ))}
                </div>
        </div>
    );
};

export default JobsPage;



// import React from "react";
// import { gql, useQuery } from "@apollo/client";
// import JobCard from "../components/JobCard";
// import { GET_JOBS, GET_HOMEOWNERS, GET_ALL_GARDENERS, GET_PLOTS } from "../utils/mutations";
// import { useAuth } from "../utils/AuthContext";

// const JobsPage = () => {
//   const { loading: loadingHomeowners, error: errorHomeowners, data: homeownersData } = useQuery(GET_HOMEOWNERS);
//   const { loading: loadingJobs, error: errorJobs, data: jobsData } = useQuery(GET_JOBS);
//   const { loading: loadingGardeners, error: errorGardeners, data: gardenersData } = useQuery(GET_ALL_GARDENERS);
//   const { loading: loadingPlots, error: errorPlots, data: plotsData } = useQuery(GET_PLOTS);

//   if (loadingHomeowners || loadingJobs || loadingGardeners || loadingPlots) return <p>Loading...</p>;
//   if (errorHomeowners || errorJobs || errorGardeners || errorPlots) {
//     return <p>Error :(</p>;
//   }

//   // Destructure data
//   const homeowners = homeownersData?.getAllHomeowners || [];
//   const jobs = jobsData?.getJobs || [];
//   const gardeners = gardenersData?.getAllGardeners || [];
//   const plots = plotsData?.getPlots || [];

//     // Helper function to get homeowner by id
//     const getHomeownerById = (homeownerId) => {
//       return homeowners.find((homeowner) => homeowner.id === homeownerId);
//     };

//     const getGardenerById = (gardenerId) => {
//       return gardeners.find((gardener) => gardener.id === gardenerId);
//     };

//     const getPlotById = (plotId) => {
//       return plots.find((plot) => plot.id === plotId);
//     };

//     return (
//       <div>
//         <h1>Jobs with Homeowners, Gardeners, and Plots</h1>
//         {jobs.map((job) => (
//           <div key={job._id}>
//             <p>Job ID: {job._id}</p>
//             {job.homeowner ? (
//               <p>
//                 Homeowner: {getHomeownerById(job.homeowner)?.firstName} {getHomeownerById(job.homeowner)?.lastName}
//               </p>
//             ) : (
//               <p>Homeowner: None</p>
//             )}
//             {job.gardener ? (
//               <p>
//                 Gardener: {getGardenerById(job.gardener)?.firstName} {getGardenerById(job.gardener)?.lastName}
//               </p>
//             ) : (
//               <p>Gardener: None</p>
//             )}
//             {job.plot ? (
//               <div>
//                 <p>Plot Name: {getPlotById(job.plot)?.name}</p>
//                 <p>Plot Address: {getPlotById(job.plot)?.address}</p>
//               </div>
//             ) : (
//               <p>Plot: None</p>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

// export default JobsPage;
