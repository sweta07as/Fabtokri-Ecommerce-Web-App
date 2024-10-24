import React from "react";
// import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
// import YouTubeIcon from "@material-ui/icons/YouTube";
import "./Footer.css";

const Footer = () => {
  return (
    // footer
    <footer id="footer">
      {/* padding */}
      {/* <div className="footerContainer"> */}
      {/* links */}
      <div className="topFooter">
        {/* links-div */}
        <div className="leftFooter">
          <h4>LOCATE US</h4>
          <div className="leftFooter-p">
            <p>B-224/A, Uttam Nagar, Dwarka More, Delhi, India, 110059</p>
            <p>+91 085276 43249</p>
            <p>fabtokri@gmail.com</p>
          </div>
        </div>

        <div className="midFooter">
          <h4>PRODUCT</h4>
          {/* <div className="midFooter-a"> */}
          <a href="/about">About</a>
          <a href="/craft">Craft</a>
          {/* <a href="/story">Story</a> */}
          <a href="/contact">Contact</a>
          {/* </div> */}
        </div>

        <div className="rightFooter">
          <h4>SUPPORT</h4>
          {/* <div className="rightFooter-a"> */}
          <a href="/privacy">Privacy Policy</a>
          <a href="/return">Return Policy</a>
          <a href="/ship">Shipping Policy</a>
          <a href="/tnc">Terms Of Service</a>
          {/* <a href="/help">Help Centre</a> */}
          {/* </div> */}
        </div>
      </div>

      <hr style={{ width: "80%" }} />

      <div className="bottomFooter">
        <div className="copyright">
          <p>&copy; Fabtokri 2023</p>
          <p className="atews">
            Designed and Developed by
            <a href="https://www.linkedin.com/in/sweta-kumari-2ba730204/">
              ATEWS
            </a>
          </p>
        </div>
        <div className="links">
          <a href="https://www.instagram.com/fabtokri/">
            <InstagramIcon className="ig" />
          </a>
          <a href="https://www.facebook.com/fabtokri">
            <FacebookIcon className="fb" />
          </a>
          <a href="https://www.linkedin.com/company/fabtokri">
            <LinkedInIcon className="linkedin" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
