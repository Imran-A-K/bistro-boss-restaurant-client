import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css'
const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
      <SectionTitle
        subHeading="check it out"
        heading="Featured Item"
      ></SectionTitle>
      <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 px-36 pb-20 pt-12">
      <div>
        <img src={featuredImg} alt="" />
      </div>
      <div className="md:ml-10">
        <p>Aug 20, 2029</p>
        <p className="uppercase">Where can I get some?</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id,
          corporis! Doloribus suscipit necessitatibus itaque sed provident
          explicabo veritatis asperiores nulla, ipsa corporis qui sapiente eaque
          voluptatem tempora molestiae minus dolorum hic. Tenetur labore
          exercitationem id voluptate quidem possimus blanditiis dolorem
          consequuntur, hic temporibus alias, provident saepe libero ipsum iusto
          omnis!
        </p>
        <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
      </div>
      </div>
    </div>
  );
};

export default Featured;
