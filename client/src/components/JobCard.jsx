import React from "react";

const JobCard = ({ job, homeowners, gardeners, plots, onClick }) => {
  const getHomeownerById = (homeownerId) => {
    return homeowners.find((homeowner) => homeowner.id === homeownerId);
  };

  const getGardenerById = (gardenerId) => {
    return gardeners.find((gardener) => gardener.id === gardenerId);
  };

  const getPlotById = (plotId) => {
    return plots.find((plot) => plot.id === plotId);
  };

  return (
    <div className="job-card-container mb-8 border border-yard-blue rounded-lg p-4">
      <h1>{job.title}</h1>
      <div className="job-card-text z-1">
      <ol>
        <p>{job.description}</p>
        <p>{job.location}</p>
        <p>{job.date}</p>
        <p>{job.budget}</p>
        {job.homeowner ? (
          <p>
            Homeowner: {getHomeownerById(job.homeowner)?.firstName} {getHomeownerById(job.homeowner)?.lastName}
          </p>
        ) : (
          <p>Homeowner: None</p>
        )}
        {job.gardener ? (
          <p>
            Gardener: {getGardenerById(job.gardener)?.firstName} {getGardenerById(job.gardener)?.lastName}
          </p>
        ) : (
          <p>Gardener: None</p>
        )}
        {job.plot ? (
          <div>
            <p>Plot Name: {getPlotById(job.plot)?.name}</p>
            <p>Plot Address: {getPlotById(job.plot)?.address}</p>
          </div>
        ) : (
          <p>Plot: None</p>
        )}
      </ol>
      </div>
      <div className="delete-job-button flex justify-center flex-col items-center"> 
       <p className="text-yard-orange">Delete Job</p> 
       <button className="spin-button text-yard-orange text-6xl p-0 m-0 " ></button> 
      </div>
    </div>
  );
};

export default JobCard;



// import React from "react";

// const JobCard = ({ jobs, onClick }) => {
//     return (
//         <div className="job-card-container mb-8">
//             <h1>{jobs.title}</h1>
//             <ol>
//                 <p>{jobs.description}</p>
//                 <p>{jobs.location}</p>
//                 <p>{jobs.date}</p>
//                 <p>{jobs.budget}</p>
//                 <p>{jobs.user.firstName}</p>
//             </ol>
//             <button key={jobs.id} className="job-card-button" onClick={onClick}>
//             </button>
//         </div>
//     )
// }

// export default JobCard;