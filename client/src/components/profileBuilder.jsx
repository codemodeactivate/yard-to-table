import React, { useState } from "react";

const profileBuilder = () => {
    const [step, setStep] = useState(1); // step 1 is the first step
    const [profile, setProfile] = useState({/*init profile state*/}); // profile is an empty object

    const handleNext = () => { // handleNext function
        setStep(step + 1); // increment step by 1
    }

    const handleBack = () => { // handleBack function
        setStep(step - 1); // decrement step by 1
    }

    const handleSubmit = () => { // handleSubmit function
        // submit profile to backend
    }

     return (
        <div>
            {step === 1 &&
            <section>
            { /*Step 1 Form*/ }
            </section>
     )}
    {step === 2 &&(
        <section>
            { /*Step 2 Form*/ }
        </section>

    )}
    {/*Repeat for all steps*/}
    <div>
        {step > 1 && <button onClick={handleBack}>Back</button>}
        {/*Set the following to max # of steps*/}
        {step < 2 && <button onClick={handleNext}>Next</button>}
        {/*Set the following to max # of steps*/}
        {step === 2 && <button onClick={handleSubmit}>Submit</button>}
    </div>
    </div>
    );
};

export default profileBuilder;
