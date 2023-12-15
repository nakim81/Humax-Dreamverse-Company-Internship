import React, { useEffect, useState, useCallback } from "react";

const { kakao } = window;

export default function Map({
  isParkinglotSelected,
  parkinglotData,
  selectedParkinglot,
}) {
  const [parkingLots, setParkingLots] = useState([]);
  const [prevParkingLot, setPrevParkingLot] = useState(null);
  const [myMap, setMyMap] = useState(null);

  const mapscript = useCallback(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(36.581, 127.986),
      level: 13,
    };

    const map = new kakao.maps.Map(container, options);
    setMyMap(map);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터링할 때 마커들의 중앙에 클러스터 마커를 생성할지 여부
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });

    let parkinglots = {};

    var markers = parkinglotData.map((parkinglot) => {
      let markerPosition = new kakao.maps.LatLng(
        parkinglot.lat,
        parkinglot.lon
      );

      var imageSrc = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        imageSize = new kakao.maps.Size(25, 25);

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      let marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);

      parkinglots[parkinglot.id] = marker;

      return marker;
    });

    setParkingLots(parkinglots);

    clusterer.addMarkers(markers);
  }, [parkinglotData]);

  useEffect(() => {
    mapscript();
  }, [mapscript]);

  useEffect(() => {
    if (myMap) {
      myMap.setCenter(new kakao.maps.LatLng(36.581, 127.986));
      myMap.setLevel(13, { animate: true });
    }
  }, [parkinglotData, myMap]);

  useEffect(() => {
    if (selectedParkinglot && myMap) {
      // console.log(selectedParkinglot.id);
      myMap.setLevel(3);
      if (prevParkingLot) {
        let prevMarker = parkingLots[prevParkingLot.id];
        if (prevMarker && prevMarker.setMap) {
          prevMarker.setMap(null);
        }
        let oldPosition = new kakao.maps.LatLng(
          prevParkingLot.lat,
          prevParkingLot.lon
        );

        var defaultScr =
            "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          defaultSize = new kakao.maps.Size(25, 25);

        var defaultImage = new kakao.maps.MarkerImage(defaultScr, defaultSize);

        let oldMarker = new kakao.maps.Marker({
          position: oldPosition,
          image: defaultImage,
        });

        oldMarker.setMap(myMap);

        parkingLots[prevParkingLot.id] = oldMarker;
      }
      let selectedMarker = parkingLots[selectedParkinglot.id];
      // selectedMarker가 존재할 경우에만 작업을 수행합니다.
      if (selectedMarker) {
        selectedMarker.setMap(null);
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize = new kakao.maps.Size(35, 41);

        let newPos = new kakao.maps.LatLng(
          selectedParkinglot.lat,
          selectedParkinglot.lon
        );

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let newMarker = new kakao.maps.Marker({
          position: newPos,
          image: markerImage,
        });

        newMarker.setMap(myMap);

        parkingLots[selectedParkinglot.id] = newMarker;

        myMap.setCenter(newPos); // 지도의 중심을 선택된 마커로 이동합니다.
        // myMap.setLevel(10, { animate: true });

        setPrevParkingLot(selectedParkinglot);
      }
    }
  }, [
    selectedParkinglot,
    myMap,
    prevParkingLot,
    parkingLots,
    setPrevParkingLot,
    setParkingLots,
  ]);

  return (
    <div
      id="map"
      style={{
        width: "45vw",
        height: "60vh",
        marginTop: "20px",
        marginRight: "20px",
      }}
    ></div>
  );
}
