import React from "react";
import HomePageCTA from "../components/HomePageCTA.jsx";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

const HomePage = () => {
  const onProfileSelection = (profileType, zip) => {
    console.log(`Selected profile: ${profileType}, ZIP: ${zip}`);
  };

  return (
    <>
      <div>
        <a href="/" className="m-8">
          <span className=" text-yard-orange">Yard</span>
          <span className="text-yard-green">to</span>
          <span className="text-yard-blue">Table</span>
        </a>
        <section className="homepage-section-top flex justify-evenly">
          <section className="cta-group px-10 flex flex-col justify-end">
            <h2 className="text-4xl text-yard-orange py-10">
              Unlock the abundance in your yard
            </h2>
            <div className="button-container text-center">
              <div className="sign-up-btns flex justify-center">
                <button className="text-center bg-yard-orange text-white">
                  <Link to="/signup">I'm a homeowner</Link>
                </button>
                <button className="text-center bg-yard-blue text-white">
                  I'm a gardener
                </button>
              </div>
              <p className="text-xs underline text-yard-gray">
                <Link to="/login">Already a member? Login!</Link>
              </p>
            </div>
          </section>
          <section className="img-group-1 px-10">
            <img
              className="max-w-xs"
              src="./assets/illustrations/021-cloudy-day-picnic.png"
              alt="Sunny day picnic"
            />
          </section>
        </section>

        <section className="homepage-section flex justify-evenly">
          <section className="img-group-2 px-10 flex max-w-4">
            <img
              src="./assets/illustrations/022-gardener-crop-circle.png"
              className="max-h-64"
              alt="Gardener with crops"
            />
          </section>
          <section className="max-w-4">
            <h2 className="overview text-4xl text-yard-red py-10 text-right">
              Your yard + their expertise = your new garden
            </h2>
            <p className="text-yard-red text-right">
              Homeowners connect with skilled gardeners and farmers to transform
              yards into thriving gardens without the hassle of the homeowner
              doing the work.
            </p>
          </section>
        </section>
        <section className="homepage-section flex justify-evenly">
          <section className="max-w-4">
            <h2 className="overview text-4xl text-yard-blue py-10 text-right">
              Dream team assemble!
            </h2>
            <p className="text-yard-blue text-right">
              Homeowners can get the support they need from experienced
              horticulturists. Simply sign up, browse through plant cultivator
              profiles, and witness your yard flourish with an abundance of
              delicious goodness.
            </p>
          </section>
          <section className="img-group-2 px-10 flex max-w-4">
            <img
              src="./assets/illustrations/020-social-interaction.png"
              className="max-h-64"
              alt="Friends high-fiving"
            />
          </section>
        </section>
        <section className="homepage-section flex justify-evenly">
          <section className="img-group-2 px-10 flex max-w-4">
            <img
              src="./assets/illustrations/environment-protection.png"
              className="max-h-64"
              alt="Bag of money with a plant"
            />
          </section>
          <section className="max-w-4">
            <h2 className="overview text-4xl text-yard-green py-10 text-right">
              Get paid for your expertise
            </h2>
            <p className="text-yard-green text-right">
              For plant experts, Yard To Table provides a platform to monetize
              your expertise, build reputation, and connect with homeowners
              seeking gardening services.
            </p>
          </section>
        </section>
        <section className="homepage-section flex gap-x-1 align-middle items-end justify-center">
          <section className="max-w-4">
            <p className="text-yard-red text-center">
              Yard To Table, where homeowners looking for hyper-local produce
              (from your own yard!) and passionate growers converge in a
              seamless, convenient, and mutually rewarding exchange. Unlock the
              abundance in your yard!
            </p>
          </section>
          <section className="img-group-2 px-10 flex max-w-4">
            <img
              src="./assets/illustrations/001-gardening.png"
              className="max-h-64"
              alt="Spade digging out a flower"
            />
          </section>
        </section>
      </div>
    </>
  );
};

export default HomePage;
