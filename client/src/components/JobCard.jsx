import React from "react";

const JobCard = ({ jobs, onClick }) => {
    return (
        <div className="job-card-container mb-8">
            <h1>{jobs.title}</h1>
            <ol>
                <p>{jobs.description}</p>
                <p>{jobs.location}</p>
                <p>{jobs.date}</p>
                <p>{jobs.budget}</p>
                <p>{jobs.user.firstName}</p>
            </ol>
            <button key={jobs.id} className="job-card-button" onClick={onClick}>
            </button>
        </div>
    )
}

export default JobCard;