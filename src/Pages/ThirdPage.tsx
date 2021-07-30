import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { API_PROD } from "../api";

interface IDetails {
  name: string;
  age: number;
  dob: string;
  profession: string;
  locality: string;
  numberOfGuests: string;
  address: string;
}

const FirstPage = () => {
  const [data, setData] = useState<IDetails[]>();

  let below18 = 0,
    below25 = 0,
    above25 = 0;

  let empCount = 0,
    studentCount = 0;

  let chnCount = 0,
    mumCount = 0,
    bngCount = 0,
    hydCount = 0;

  let totalCount = 0,
    zeroPplCount = 0,
    onePplCount = 0,
    twoPplCount = 0;

  let zeroPplAvg = 0,
    onePplAvg = 0,
    twoPplAvg = 0;

  const fetchData = () => {
    fetch(`${API_PROD}/show`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res: { json: () => any }) => res.json())
      .then((json: any) => setData(json));
  };
  useEffect(() => {
    fetchData();
  }, []);

  data?.forEach((ele: any) => {
    //age group
    if (ele.age > 13 && ele.age < 18) {
      below18++;
    } else if (ele.age > 18 && ele.age < 25) {
      below25++;
    } else if (ele.age > 25) {
      above25++;
    }

    //professor or student
    if (ele.profession === "Employee") {
      empCount++;
    } else {
      studentCount++;
    }

    //locality
    if (ele.locality === "Chennai") {
      chnCount++;
    } else if (ele.locality === "Mumbai") {
      mumCount++;
    } else if (ele.locality === "Hyderabad") {
      hydCount++;
    } else if (ele.locality === "Bangalore") {
      bngCount++;
    }

    //guests
    if (ele.numberOfGuests === 0) {
      zeroPplCount++;
    } else if (ele.numberOfGuests === 1) {
      onePplCount++;
    } else if (ele.numberOfGuests === 2) {
      twoPplCount++;
    }
    totalCount++;
  });

  zeroPplAvg = (zeroPplCount / totalCount) * 100;
  onePplAvg = (onePplCount / totalCount) * 100;
  twoPplAvg = (twoPplCount / totalCount) * 100;

  return (
    <>
      <div className="condiv home">
        <div className="chart__wrapper">
          <div style={{ marginRight: "40px" }}>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Age", "Count"],
                ["13-18", below18],
                ["18-25", below25],
                ["25+", above25],
              ]}
              options={{
                chart: {
                  title: "RSVP Age Group",
                  subtitle: "Count of person in a certain age group",
                },
              }}
            />
          </div>
          <div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Profession", "Count"],
                ["Student", studentCount],
                ["Employee", empCount],
              ]}
              options={{
                chart: {
                  title: "RSVP Profession",
                  subtitle: "Count of person based on their profession",
                },
              }}
            />
          </div>
        </div>
        <div className="chart__wrapper" style={{ marginTop: "50px" }}>
          <div style={{ marginRight: "40px" }}>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Cities", "Count"],
                ["Chennai", chnCount],
                ["Mumbai", mumCount],
                ["Bangalore", bngCount],
                ["Hyderabad", hydCount],
              ]}
              options={{
                chart: {
                  title: "RSVP Locality",
                  subtitle: "Count of person based on their Locality",
                },
              }}
            />
          </div>
          <div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["No.of Guests", "Average"],
                ["0", zeroPplAvg],
                ["1", onePplAvg],
                ["2", twoPplAvg],
              ]}
              options={{
                chart: {
                  title: "RSVP Guests",
                  subtitle: "Average of guests attended",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
