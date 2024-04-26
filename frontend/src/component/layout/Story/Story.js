import React from "react";
import "./Story.css";
import Zaki from "./zakiWeaver.JPG";

const Story = () => {
  return (
    <div className="para">
      <h1>Story</h1>
      <hr></hr>

      <div className="box">
        <div>
          <img src={Zaki} alt="Zaki" id="zakiWeaver"/>
        </div>

        <p>
          Zaki, a skilled Benaras saree maker from Mubarakpur, is an artisan
          whose family business has thrived for the past 15 years. This legacy
          is a testament to their craftsmanship and dedication to creating
          beautiful sarees that cater to a wide range of customers, including
          those seeking more affordable options. Despite the variations in
          social class, the demand for their sarees remains consistently strong.
          Zaki takes immense pride in his family's business and the contribution
          they make to the world of handloom weaving. Their sarees, dupatta and
          stole are not just pieces of fabric; they are woven with love,
          tradition, and a deep understanding of the art form. Zaki understands
          the cultural significance of the Benaras saree and the connection it
          holds to the heritage and identity of the region.
        </p>

        <p>
          In a time when power loom production is becoming increasingly
          prevalent, Zaki remains committed to traditional handloom techniques.
          He recognizes the importance of preserving these ancient methods,
          which have been passed down through generations. Handloom weaving
          requires intricate skill and patience, as every thread is carefully
          intertwined to create unique patterns and designs. This meticulous
          process ensures that each saree carries a piece of the artisan's soul,
          making it truly one-of-a-kind. Zaki's commitment to traditional
          techniques extends beyond his personal preferences. He understands the
          impact of power loom production on the livelihoods of countless
          weavers and artisans. The shift towards mechanized processes often
          leads to job losses and the erosion of cultural traditions. By
          continuing to weave sarees using traditional handloom methods, Zaki
          ensures that his craft remains relevant and that the livelihoods of
          his fellow artisans are preserved.
        </p>

        <p>
          Zaki's story is a testament to the resilience of traditional artisans
          and their ability to thrive in a rapidly changing world. Despite the
          growing popularity of power loom production, his commitment to
          handloom techniques and the cultural heritage they represent has
          allowed him to create a niche for his family business. Through his
          craft, Zaki not only weaves sarees but also weaves together the
          threads of tradition, culture, and the timeless beauty of the Benaras
          saree.
        </p>

      </div>
    </div>
  );
};

export default Story;
