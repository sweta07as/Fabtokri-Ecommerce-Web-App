import React from "react";
import "./Craft.css";
import Craft1 from "./1.1.JPG";


const Craft = () => {
  return (
    <div className="para">
      <h1>Craft</h1>
      <hr></hr>

      <div className="box">
        
        <div>
          <img src={Craft1} alt="" id="Craft1" />
        </div>

        <p>
          Mubarakpur, an ancient handloom weaving cluster, boasts a rich
          heritage of silk weaving that dates back to the 14th century. This
          remarkable region has been renowned for its exquisite craftsmanship
          and, historically, its opulent satin weave adorned with intricate zari
          motifs. Today, in Mubarakpur there are more than 20000 weavers engaged
          in weaving work and create a diverse range of products using beautiful
          handloom brocade weaves. One of the most remarkable aspects of the
          cluster is its ability to strike a perfect balance between traditional
          and modern design sensibilities. The weavers possess a remarkable
          skill set, enabling them to create intricate motifs and borders on
          pure silk and silk cotton fabrics. Furthermore, they have meticulously
          documented their past designs, ensuring that their artistic legacy is
          passed down through generations.
        </p>

        <p>
          The weavers from Mubarakpur continue to practice the revered 'kadhua'
          technique of hand weaving, wherein each motif is meticulously woven
          into the fabric. Additionally, they employ the captivating 'Meena'
          work, wherein a single buta (motif) can feature up to three different
          colours. These techniques showcase the artisans' dedication to
          preserving the authenticity and craftsmanship that Mubarakpur is
          renowned for. It is noteworthy that cluster has been awarded the
          Craftmark certification, a testament to their commitment to authentic,
          high-quality, and responsible production. This prestigious
          certification ensures that the dignity of the weavers is upheld, and
          their sustainable livelihoods are safeguarded.
        </p>

        <p>
          Mubarakpur stands as a timeless hub of handloom weaving, steeped in
          centuries of tradition and craftsmanship. The cluster, with its
          masterful weavers and dedication to preserving the art form, ensures
          that this rich heritage continues to flourish. The organization's
          ability to blend traditional techniques with modern design
          sensibilities has made it a prominent name in the world of handloom
          weaving.
        </p>
      </div>
    </div>
  );
};

export default Craft;
