import React from "react";

const FlipCard = () => {
  const posts = [
    {
      img: "https://res.cloudinary.com/djljb8aby/image/upload/v1716923507/AgroHub/SiteAssets/_fa196bc8-4eb1-4151-9794-37351f9f89b4_itfp4x.jpg",
      title: "Enhancing Crop Yield",
      description:
      "The significant impact of biotechnology on agriculture, including genetic modifications and CRISPR. It discusses how these scientific advancements are improving crop yields, enhancing pest resistance, and increasing resilience to climate change."
    },
    {
      img: "https://res.cloudinary.com/djljb8aby/image/upload/v1716923511/AgroHub/SiteAssets/_52844a79-23fc-4c65-991d-8ed81aa06801_t7j61o.jpg",
      title: "Technology is Transforming Farming",
      description:
        "Technology is Transforming Farming such as drones, IoT, AI, and robotics in modern agriculture. It highlights how these innovations are increasing efficiency, precision, and productivity, revolutionizing traditional farming practices.",
    },
    {
      img: "https://res.cloudinary.com/djljb8aby/image/upload/v1716923589/AgroHub/SiteAssets/_037b59c1-795a-4756-ae09-6de63a59351c_ca5ick.jpg",
      title: "Sustainable Farming",
      description:
      "Innovations Driving the Future of Agriculture, delves into the latest sustainable farming practices, focusing on eco-friendly technologies and methods that reduce resource consumption and environmental impact while ensuring long-term agricultural productivity and food security."
    },
  ];
  return (
    <div className="unique-container">
      {posts.map((post, index) => (
        <div className="unique-box" key={index}>
          <div className="unique-body">
            <div className="unique-imgContainer">
              <img src={post.img} alt={post.title} />
              <h2 className="unique-title">{post.title}</h2>
            </div>
            <div className="unique-content d-flex flex-column align-items-center justify-content-center">
              <div>
                <h3 className="text-white fs-5">{post.title}</h3>
                <p className="fs-6 text-white">{post.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlipCard;
