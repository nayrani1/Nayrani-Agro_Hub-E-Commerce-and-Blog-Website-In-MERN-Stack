import React from 'react'
import Marquee from "react-fast-marquee";

const Marque = () => {
    const MarqueeContent = [
        {
          url: "https://res.cloudinary.com/djljb8aby/image/upload/v1709228516/AgroHub/SiteAssets/partner_01_kzs8be.png",
        },
        {
          url: "https://res.cloudinary.com/djljb8aby/image/upload/v1709228516/AgroHub/SiteAssets/partner_04_rkj6dr.png",
        },
        {
          url: "https://res.cloudinary.com/djljb8aby/image/upload/v1709228516/AgroHub/SiteAssets/partner_02_j9ps3a.png",
        },
        {
          url: "https://res.cloudinary.com/djljb8aby/image/upload/v1709228516/AgroHub/SiteAssets/partner_03_kzt0x7.png",
        },
      ];
  return (
       <div className="marquee-img-container">
          <Marquee>
            {MarqueeContent.map((item) => (
              <div className="marquee-img">
                <img src={item.url} alt="" />
              </div>
            ))}
          </Marquee>
        </div>
  )
}

export default Marque;