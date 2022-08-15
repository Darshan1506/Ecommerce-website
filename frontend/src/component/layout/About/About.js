import { Avatar, Button, Typography } from '@material-ui/core'
import React from 'react'
import LinkedIn from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GithubIcon from "@material-ui/icons/GitHub";

import "./About.css"
const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/daarrsshhaannn";
      };
  return (
    <div className='aboutSection'>
        <div></div>
        <div className='aboutSectionGradient'></div>
        <div className='aboutSectionContainer'>
            <Typography component="h1">About Us</Typography>
        <div>
        <div>
            <Avatar
            style={{width:"10vmax" , height:"10vmax",margin:"2vmax 0"}}
            src="https://res.cloudinary.com/darshancloud47/image/upload/v1657960855/avatars/s0bnx6zxhomrlygni0v6.jpg"
            alt="Founder"
            />
            <Typography>Darshan Rajpurohit</Typography>
            <Button onClick={visitInstagram} color="primary">
                Visit Instagram
            </Button>
            <span>
                It is a E-commerce Website made by Darshan Rajpurohit. If You are a recruiter or someone who like this website and wants to reach me out then here are my socials.
            </span>
        </div>
        <div className='aboutSectionContainer2'>
            <Typography component="h2">Our Socials</Typography>
            <a
             href='https://www.linkedin.com/in/darshan-rajpurohit-b9a0b01b7/'
             target="blank"
            >
                <LinkedIn className='linkedinIcon'/>
            </a>
            <a href="https://twitter.com/daarrsshhaannnn" target="blank">
              <TwitterIcon className="twitterIcon" />
            </a>
            <a href="https://github.com/Darshan1506" target="blank">
              <GithubIcon className="githubIcon" />
            </a>
            </div>
        </div>
    </div>
    </div>

  )
}

export default About