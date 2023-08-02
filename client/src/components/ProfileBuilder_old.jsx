import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { SAVE_FORM_DATA_MUTATION, CREATE_PLOT_MUTATION } from "../utils/mutations";



const ProfileBuilder = () => {
    // Step state to manage the current step of the form
    const [step, setStep] = useState(1);

    // Form hook to manage form inputs and validation
    const { register, handleSubmit, getValues, watch } = useForm();
    const [userID, setUserID] = useState(null);

    // Access the ID parameter from the URL (if available)
    const { id } = useParams();

    // Navigate function from React Router to handle page navigation
    const navigate = useNavigate();

    // Location hook from React Router to get state data from the previous page
    const location = useLocation();
    // Extract zip from the state if it exists, otherwise, set it to an empty string
    const zip = location?.state?.zip || "";

    // State to hold the base64 representation of the uploaded photo
    const [photoFile, setPhotoFile] = useState(null);

    // Helper function to handle file drop and convert the file to base64
    const handlePhotoDrop = async (files) => {
        try {
            const selectedPhotoFile = files[0];
            const base64String = await getBase64FromFile(selectedPhotoFile);
            setPhotoFile(base64String); // Set the base64 string in state
        } catch (error) {
            console.error("Error converting photo to base64:", error);
        }
    };

    // Helper function to convert a file to base64
    const getBase64FromFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Form data state to hold all form input values
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        plotName: "",
        zip: zip, // Initialized with zip from the previous step if it exists
        streetAddress: "",
        lotSquareFootage: "",
        plotType: "",
        //photo: null, // To handle file upload later
    });

    // GraphQL mutation for saving form data
    const [saveFormData, { loading, error }] = useMutation(
        SAVE_FORM_DATA_MUTATION
    );


    const [createPlot, { loading: createPlotLoading, error: createPlotError }] = useMutation(
      CREATE_PLOT_MUTATION
    );

    // Function to handle the "Next" button click event for form step navigation
    // const handleNext = async (formStepData) => {
    //     try {
    //       // Call the mutation with the updated form data
    //       formStepData.lotSquareFootage = parseFloat(formStepData.lotSquareFootage);
    //       const { data } = await saveFormData({
    //         variables: {
    //           step: 1,
    //           input: {
    //             ...formData,
    //             ...formStepData,
    //           },
    //         },
    //       });

    //       if (step === 1 && data.saveFormData.userID) {
    //         setUserID(data.saveFormData.userID);
    //       }

    //       // Update the formData object with the data from the current step
    //       setFormData({
    //         ...formData,
    //         ...formStepData,
    //         UserID: location.state.userID,
    //       });
    //       console.log("Step 3 - User ID:", userID);
    //       // If the user is on Step 3, call the handleFormSubmit function
    //       if (step === 3) {
    //         handleFormSubmit();
    //       } else {
    //         // If not on Step 3, advance to the next step
    //         setStep(step + 1);
    //       }
    //     } catch (err) {
    //       console.error("An error occurred while saving data:", err);
    //       // Handle the error as needed
    //     }
    //   };
    const handleNext = (data) => {
        // Update the form data with the data passed from handleNext
        setFormData((prevFormData) => ({ ...prevFormData, ...data }));

        // Advance to the next step
        setStep((prevStep) => Math.min(prevStep + 1, 4));
      };

      const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1));
      };

    // Function to handle form submission for the last step
    // const handleFormSubmit = async () => {


    //     console.log("Form Step Data (Step 3):", formData);

    //       // Make sure password and confirmPassword fields are not empty
    //     if (!formData.password || !formData.confirmPassword) {
    //         // Handle the case when the password fields are empty (you can show an error message to the user)
    //         console.error("Password and Confirm Password are required.");
    //         return;
    //     }

    //     // Make sure the passwords match
    //     if (formData.password !== formData.confirmPassword) {
    //         // Handle the case when the passwords don't match (you can show an error message to the user)
    //         console.error("Password and Confirm Password must match.");
    //         return;
    //     }

    //     const plotData = {
    //         plotName: formData.plotName,
    //         streetAddress: formData.streetAddress,
    //         lotSquareFootage: formData.lotSquareFootage,
    //         plotType: formData.plotType,
    //         //userID,
    //       };

    //     try {
    //       // Check the plot data before attempting to save it


    //       // 1. Save step3 data in the plot collection using the addPlot mutation
    //       const { data: plotMutationData } = await createPlot({
    //         variables: {
    //           input: plotData,
    //         },
    //       });
    //       console.log("formData: ", formData)
    //       console.log("New Plot entry created:", plotMutationData.createPlot);

    //       // 2. Update the user document to link the plot to the user's plots array
    //       const { data: userMutationData } = await saveFormData({
    //         variables: {
    //           step: 3,
    //           input: {
    //             step3: {
    //               plotName: formData.plotName,
    //               zip: formData.zip,
    //               streetAddress: formData.streetAddress,
    //               lotSquareFootage: formData.lotSquareFootage,
    //               plotType: formData.plotType,
    //             },
    //             password: formData.password, // Add PW field
    //             confirmPassword: formData.confirmPassword, // Add confirm PW field
    //           },
    //         },
    //       });
    //       console.log("Plot Data Step 3", formData);
    //       console.log("User document updated:", userMutationData.saveFormData);

    //       // After updating the form data and advancing to the next step, the user is presented with Step #4.
    //       setStep(4);
    //     } catch (err) {
    //       // When an error occurs, we log the error message to the console for debugging purposes.
    //       console.error("An error occurred while saving data:", err);

    //       // We can handle the error as needed, depending on the use case. For example, we can show an error message to the user or display a notification indicating the failure to save the data.
    //     }





    //   };

    const handleFormSubmit = async () => {
        const formData = watch();
        try {
          // Make sure password and confirmPassword fields are not empty
          if (!formData.password || !formData.confirmPassword) {
            // Handle the case when the password fields are empty (you can show an error message to the user)
            console.error('Password and Confirm Password are required.');
            return;
          }

          // Make sure the passwords match
          if (formData.password !== formData.confirmPassword) {
            // Handle the case when the passwords don't match (you can show an error message to the user)
            console.error('Password and Confirm Password must match.');
            return;
          }

          const lotSquareFootage = parseInt(formData.lotSquareFootage);
          console.log("Parsed lotSquareFootage:", lotSquareFootage);

          const plotData = {
            plotName: formData.plotName,
            streetAddress: formData.streetAddress,
            lotSquareFootage: parseInt(formData.lotSquareFootage),
            plotType: formData.plotType,
            // userID, // If needed, you can include userID here
          };

          // 1. Save step3 data in the plot collection using the createPlot mutation
          const { data: plotMutationData } = await createPlot({
            variables: {
              input: plotData,
            },
          });
          console.log('formData: ', formData);
          console.log('New Plot entry created:', plotMutationData.createPlot);

          // 2. Update the user document to link the plot to the user's plots array
          const { data: userMutationData } = await saveFormData({
            variables: {
              step: 3,
              input: {
                step3: {
                  plotName: formData.plotName,
                  zip: formData.zip,
                  streetAddress: formData.streetAddress,
                  lotSquareFootage: parseInt(formData.lotSquareFootage),
                  plotType: formData.plotType,
                },
                password: formData.password, // Add PW field
                confirmPassword: formData.confirmPassword, // Add confirm PW field
              },
            },
          });
          console.log('Plot Data Step 3', formData);
          console.log('User document updated:', userMutationData.saveFormData);

          // After updating the form data and advancing to the next step, the user is presented with Step #4.
          setStep(4);
        } catch (err) {
          // When an error occurs, we log the error message to the console for debugging purposes.
          console.error('An error occurred while saving data:', err);

          // We can handle the error as needed, depending on the use case. For example, we can show an error message to the user or display a notification indicating the failure to save the data.
        }
      };



    // console.log("formData:", formData); // Log formData here
    return (
        <div>
            {step === 1 && (
                <section>
                    <form onSubmit={handleSubmit(handleNext)}>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                defaultValue={formData.firstName}
                                {...register("firstName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={formData.lastName}
                                {...register("lastName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={formData.email}
                                {...register("email", { required: true })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                defaultValue={formData.password}
                                {...register("password", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                defaultValue={formData.confirmPassword}
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                            />
                        </div>

                        {/* ... other fields here ... */}
                        {/*This is dynamically added below
            <button type="submit">Next</button>*/}
                    </form>
                </section>
            )}
            {step === 2 && (
                <section>
                    <h2>All signed up!</h2>
                    <p>
                        Next step is to fill out your profile so you can find
                        the right gardener for you!
                    </p>
                    {/* Here you can display any other information about the user's progress */}
                </section>
            )}

            {step === 3 && (
                <section>
                    <h2>Profile</h2>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div>
                            <label htmlFor="plotName">Plot Name</label>
                            <input
                                type="text"
                                name="plotName"
                                {...register("plotName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="zip">Zip</label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip} // Prefilled with zip if it exists
                                // onChange={handleInputChange}
                                {...register("zip", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="streetAddress">
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="streetAddress"
                                {...register("streetAddress", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="lotSquareFootage">
                                Lot Square Footage
                            </label>
                            <input
                                type="number"
                                name="lotSquareFootage"
                                {...register("lotSquareFootage", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="plotType">Plot Type</label>
                            <select
                                name="plotType"
                                {...register("plotType", { required: true })}
                            >
                                <option value="pollinator">Pollinator</option>
                                <option value="vegetable">Vegetable</option>
                                <option value="mixed">Mixed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {/* <div>
                            <label htmlFor="photo">Upload Photo</label>
                            <Dropzone onDrop={handlePhotoDrop} accept="image/*">
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        className="dropzone"
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        {photoFile ? (
                                            <p>
                                                File selected: {photoFile.name}
                                            </p>
                                        ) : (
                                            <p>
                                                Drag 'n' drop a photo here, or
                                                click to select files
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div> */}
                        {/* Other fields and buttons here */}
                    </form>
                </section>
            )}
            {step === 4 && (
                <section>
                    <h1>Your Profile</h1>
                    <p>Your profile has been saved!</p>
                    <Link to="/user-dashboard">Go to User Dashboard</Link>
                </section>
            )}

                    <div>
                        {step > 1 && <button onClick={handleBack}>Back</button>}
                        {step < 4 && (
                        <button onClick={() => handleNext({ ...getValues() })}>Next</button>
                        )}
                        {step === 4 && <button onClick={handleFormSubmit}>Submit</button>}
                    </div>
        </div>
    );
};

export default ProfileBuilder;
