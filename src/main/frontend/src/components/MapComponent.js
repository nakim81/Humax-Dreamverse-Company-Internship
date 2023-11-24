import React, { useEffect } from "react";

const { kakao } = window;

function MapComponent({ parkinglotData }) {
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);

      parkinglotData.forEach((parkinglot) => {
        const markerPosition = new kakao.maps.LatLng(
          parkinglot.lat,
          parkinglot.lon
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    });
  }, [parkinglotData]);

  return (
    <div
      id="map"
      style={{ width: "500px", height: "400px", margin: "10px" }}
    ></div>
  );
}

export default MapComponent;
