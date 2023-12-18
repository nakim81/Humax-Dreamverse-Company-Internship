import React, { useEffect } from "react";

const LatLonMap = ({ lat, lon, height }) => {
  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 2,
      };
      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(lat, lon);
      // eslint-disable-next-line no-unused-vars
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });
    };

    window.kakao.maps.load(initMap);
  }, [lat, lon]);

  return <div id="map" style={{ width: "100%", height: height + "px" }}></div>;
};

export default LatLonMap;
