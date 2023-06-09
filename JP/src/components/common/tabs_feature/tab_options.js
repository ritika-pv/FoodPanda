import React from "react";
import deliveyImage from "../../../images/delivery.png";
import inactiveDeliveyImage from "../../../images/inactive_delivery.png";
import diningOut from "../../../images/dining_out.jpg";
import inactiveDinignOut from "../../../images/dining_out_inactive.png";
import "./tab_option.css";

const tabs = [
  {
    id: 1,
    name: "Delivery",
    active_img: deliveyImage,
    inactive_img: inactiveDeliveyImage,
    background: "#FCEEC0",
  },
  {
    id: 2,
    name: "Dining Out",
    active_img: diningOut,
    inactive_img: inactiveDinignOut,
    background: "#E5F3F3",
  },
];
export const TabOptions = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-options">
      <div className="max-width options-wrapper">
        {tabs.map((tab) => {
          return (
            <div
              onClick={() => setActiveTab(tab.name)}
              className={`tab-item absolute-center cur-pointer ${
                activeTab === tab.name && "active-tab"
              }`}
            >
              <div
                className="tab-image-container absolute-center"
                style={{
                  
                  backgroundColor: `${
                    activeTab === tab.name ? tab.background : ""
                  }`,
                }}
              >
                <img
                  className="tab-image"
                  alt={tab.name}
                  src={
                    activeTab === tab.name ? tab.active_img : tab.inactive_img
                  }
                />
              </div>
              <div className="tab-name">{tab.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
