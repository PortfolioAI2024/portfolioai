import React from "react";

function PortfolioCV() {
    return (
        <div className="portfolio">
            <div className="resume-wrapper">
                <section className="profile section-padding">
                    <div className="container">
                        <div className="picture-resume-wrapper">
                            <div className="picture-resume">
                                <span>
                                    <img
                                        src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"
                                        alt=""
                                    />
                                </span>
                                <svg version="1.1" viewBox="0 0 350 350">
                                    <defs>
                                        <filter id="goo">
                                            <feGaussianBlur
                                                in="SourceGraphic"
                                                stdDeviation="8"
                                                result="blur"
                                            />
                                            <feColorMatrix
                                                in="blur"
                                                mode="matrix"
                                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
                                                result="cm"
                                            />
                                        </filter>
                                    </defs>
                                    <g filter="url(#goo)">
                                        <circle
                                            id="main_circle"
                                            className="st0"
                                            cx="171.5"
                                            cy="175.6"
                                            r="130"
                                        />
                                        <circle
                                            id="circle"
                                            className="bubble0 st1"
                                            cx="171.5"
                                            cy="175.6"
                                            r="122.7"
                                        />
                                        {/* Add other circle elements here */}
                                    </g>
                                </svg>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="name-wrapper">
                            <h1>
                                John <br />
                                Anderson
                            </h1>
                        </div>
                        <div className="clearfix"></div>
                        <div className="contact-info clearfix">
                            <ul className="list-titles">
                                <li>Call</li>
                                <li>Mail</li>
                                <li>Web</li>
                                <li>Home</li>
                            </ul>
                            <ul className="list-content">
                                <li>+34 123 456 789</li>
                                <li>j.anderson@gmail.com</li>
                                <li>
                                    <a href="#">janderson.com</a>
                                </li>
                                <li>Los Angeles, CA</li>
                            </ul>
                        </div>
                        <div className="contact-presentation">
                            <p>
                                <span className="bold">Lorem</span> ipsum dolor
                                sit amet, consectetur adipiscing elit. Vivamus
                                euismod congue nisi, nec consequat quam. In
                                consectetur faucibus turpis eget laoreet. Sed
                                nec imperdiet purus.{" "}
                            </p>
                        </div>
                        <div className="contact-social clearfix">
                            <ul className="list-titles">
                                <li>Twitter</li>
                                <li>Dribbble</li>
                                <li>Codepen</li>
                            </ul>
                            <ul className="list-content">
                                <li>
                                    <a href="">@janderson</a>
                                </li>
                                <li>
                                    <a href="">janderson</a>
                                </li>
                                <li>
                                    <a href="">janderson</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="experience section-padding">
                    <div className="container">
                        {/* Add experience content here */}
                    </div>
                </section>

                <div className="clearfix"></div>
            </div>
        </div>
    );
}

export default PortfolioCV;
