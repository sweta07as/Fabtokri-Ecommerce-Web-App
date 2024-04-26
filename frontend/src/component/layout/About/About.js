import React from "react";
import "./About.css";
import One from "./1.jpg";
import Two from "./2.jpg";
import Three from "./3.jpg";
import Four from "./4.jpg";
import Five from "./5.jpg";
import Six from "./6.JPG";
import Seven from "./7.JPG";

const About = () => {
  return (
    <div className="para">
      <h1>About Us</h1>
      <hr></hr>

      <div className="box">
        <div className="aboutContainer">
          <img src={One} alt="Collage" className="aboutCollage" />
          <img src={Two} alt="Collage" className="aboutCollage" />
          <img src={Three} alt="Collage" className="aboutCollage" />
          <img src={Four} alt="Collage" className="aboutCollage" />
          <img src={Five} alt="Collage" className="aboutCollage" />
        </div>

        <p>
          Fabtokri is a platform that aims to empower weavers and artisans by
          providing them with a direct channel to sell their exquisite products
          to buyers. The core objective of this platform is to bring authentic
          ethnic handloom weaves to buyers at affordable prices, thereby
          preserving the rich cultural heritage of traditional crafts. In many
          corners of the country, there are numerous talented weavers and
          artisans who create exceptional products. However, they often face
          significant challenges due to a lack of market access and visibility.
          Despite their exceptional skills, these craftsmen struggle to showcase
          their creations to a wider audience, limiting their potential for
          growth and recognition in both national and global markets. This is
          where Fabtokri steps in as a transformative force, bridging the gap
          between the artisans, weavers, and buyers. By offering a user-friendly
          online platform, Fabtokri provides a space for these talented
          individuals to showcase their craft and connect directly with buyers
          who appreciate and value their work.
        </p>

        <div>
          <img src={Seven} alt="" id="Seven" />
        </div>

        <p>
          One of the key advantages of Fabtokri is that it ensures buyers have
          access to pure handmade products of the highest quality. Every item
          available on the platform goes through a rigorous quality check to
          ensure that it meets the stringent standards set by the platform.
          Buyers can be confident that they are purchasing authentic,
          meticulously crafted pieces that showcase the skill and artistry of
          the weavers and artisans. Moreover, Fabtokri serves as a catalyst for
          the revival of different crafts and cultures within the country. By
          showcasing the diverse range of art forms from various regions, the
          platform actively contributes to the preservation and promotion of
          traditional crafts. Through Fabtokri, buyers not only have the
          opportunity to acquire unique and culturally significant products but
          also play a part in sustaining the livelihoods of these talented
          artisans. The platform also recognizes the need to support the weavers
          and artisans beyond just providing a marketplace. Fabtokri offers
          resources and assistance to help artisans enhance their technical
          understanding and market knowledge. By empowering them with relevant
          skills and knowledge, Fabtokri enables these craftsmen to navigate the
          complexities of the modern market and position their products
          effectively.
        </p>

        <div>
          <img src={Six} alt="" id="Six" />
        </div>

        <p>
          Fabtokri's commitment to fair trade practices ensures that the
          artisans receive a fair share of the profits from their creations. The
          platform provides them with a transparent and equitable system,
          eliminating intermediaries that often exploit artisans and suppress
          their earnings. This fair compensation not only motivates the weavers
          and artisans to continue their craft but also contributes to the
          overall socio-economic development of their communities. Fabtokri is a
          pioneering platform that revolutionizes the way weavers and artisans
          sell their products. By connecting them directly with buyers, it
          empowers these talented craftsmen to overcome the barriers of market
          access and visibility. Through Fabtokri, buyers can discover and
          purchase authentic handmade products while supporting the revival of
          traditional crafts and cultures. This platform is a testament to the
          power of technology and commerce in driving positive change in the
          lives of artisans and weavers, ensuring their artistry thrives for
          generations to come.
        </p>
      </div>
    </div>
  );
};

export default About;
