import React from "react";
import styles from "./ParkingDetail.module.css";
import LatLonMap from "./LatLonMap";

const ParkingDetail = ({ parkingData }) => {
  return (
    <>
      <div className={styles.detailContent}>
        <div className={styles.map}>
          <LatLonMap lat={parkingData.lat} lon={parkingData.lon} height={400} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.colorLargeBoldText}>
              {parkingData.parkingId}
            </div>
            <div className={styles.largeBoldText}>{parkingData.name}</div>
            <div className={styles.boldText}>{parkingData.codeNumber}</div>
            {parkingData.is_active === "1" ? (
              <div className={styles.blueText}>운영중</div>
            ) : (
              <div className={styles.redText}>운영 예정</div>
            )}
          </div>
          <div className={styles.chargeContainer}>
            <div className={styles.middleBoldText}>요금정보</div>
            <div className={styles.boldText}>주차요금 정보</div>
            {parkingData.normalSeaon !== "NULL" && parkingData.normalSeason && (
              <div className={styles.labelContainer}>
                <div className={styles.label}>성수기</div>
                <div className={styles.grayText}>
                  {parkingData.normalSeason}
                </div>
              </div>
            )}
            {parkingData.tenantSeason !== "NULL" &&
              parkingData.tenantSeason && (
                <div className={styles.labelContainer}>
                  <div className={styles.label}>비수기</div>
                  <div className={styles.grayText}>
                    {parkingData.tenantSeason}
                  </div>
                </div>
              )}

            {parkingData.dayTicket !== "NULL" && parkingData.dayTicket && (
              <div className={styles.labelContainer}>
                <div className={styles.label}>일일권</div>
                <div className={styles.grayText}>{parkingData.dayTicket}</div>
              </div>
            )}
            {parkingData.timeTicket !== "NULL" && parkingData.timeTicket && (
              <div className={styles.labelContainer}>
                <div className={styles.label}>기본요금</div>
                <div className={styles.grayText}>{parkingData.timeTicket}</div>
              </div>
            )}
            {(parkingData.specialDay ||
              parkingData.specialHour ||
              parkingData.specialNight ||
              parkingData.specialWeekend) &&
              (parkingData.specialDay !== "NULL" ||
                parkingData.specialHour !== "NULL" ||
                parkingData.specialNight !== "NULL" ||
                parkingData.specialWeekend !== "NULL") && (
                <>
                  <div className={styles.boldText}>휴일요금 정보</div>
                  <div>
                    {parkingData.specialDay !== "NULL" &&
                      parkingData.specialDay && (
                        <div className={styles.labelContainer}>
                          <div className={styles.label}>일일</div>
                          <div className={styles.grayText}>
                            {parkingData.specialDay}
                          </div>
                        </div>
                      )}
                    {parkingData.specialHour !== "NULL" &&
                      parkingData.specialHour && (
                        <div className={styles.labelContainer}>
                          <div className={styles.label}>주간</div>
                          <div className={styles.grayText}>
                            {parkingData.specialHour}
                          </div>
                        </div>
                      )}
                    {parkingData.specialNight !== "NULL" &&
                      parkingData.specialNight && (
                        <div className={styles.labelContainer}>
                          <div className={styles.label}>야간</div>
                          <div className={styles.grayText}>
                            {parkingData.specialNight}
                          </div>
                        </div>
                      )}
                    {parkingData.specialWeekend !== "NULL" &&
                      parkingData.specialWeekend && (
                        <div className={styles.labelContainer}>
                          <div className={styles.label}>주말</div>
                          <div className={styles.grayText}>
                            {parkingData.specialWeekend}
                          </div>
                        </div>
                      )}
                  </div>
                </>
              )}
          </div>
          <div className={styles.parkingContainer}>
            <div className={styles.middleBoldText}>시설정보</div>
            <div className={styles.boldText}>기본정보</div>
            <div className={styles.labelContainer}>
              <div className={styles.label}>주소</div>
              <div className={styles.grayText}>{parkingData.address}</div>
            </div>
            {parkingData.operatingTime && (
              <>
                <div className={styles.boldText}>운영시간</div>

                <div>
                  {parkingData.operatingTime.split(",").map((time, index) => (
                    <div key={index}>{time.trim()}</div>
                  ))}
                </div>
              </>
            )}
            {parkingData.operation !== "NULL" && parkingData.operation && (
              <>
                <div className={styles.boldText}>참고사항</div>
                <div>{parkingData.operation}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParkingDetail;
