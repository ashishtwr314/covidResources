import React, { useEffect, useState } from "react";
import {
  Card,
  Dimmer,
  Icon,
  Input,
  Loader,
  Message,
  Search,
  Segment,
} from "semantic-ui-react";
import { firebaseApp } from "./firebase";

function NeedResources({ setShowSidebar }) {
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    if (searchVal) {
      searchByCity(searchVal);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const searchByCity = (cityName) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    const dataByCity = dataCopy.filter((info) => info.loc.includes(cityName));
    console.log(dataByCity);
    setDataToShow(dataByCity);
  };

  const loadInitialData = () => {
    setLoading(true);
    firebaseApp
      .database()
      .ref("myData")
      .orderByChild("createdAt")
      .once("value", (snap) => {
        const data = [];
        snap.forEach(function (child) {
          data.push(child.val());
        });
        data.reverse();
        setData(data);
        setDataToShow(data);
        setLoading(false);
      });
  };

  const searchForData = (searchQuery) => {};

  return (
    <div style={{ width: "65%", margin: "0 auto" }}>
      <Input
        style={{ width: "100%", marginTop: "30px" }}
        value={searchVal}
        onChange={(e) => {
          if (e.target.value == "") {
            loadInitialData();
          }
          setSearchVal(e.target.value);
        }}
        icon={
          <Icon onClick={handleSearch} name="search" inverted circular link />
        }
        placeholder="Search by your city..."
      />
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="cards-container">
          {dataToShow.length ? (
            dataToShow.map((info) => (
              <Card>
                <Card.Content header={info.name} />
                <Card.Content description={info.message} />
                <Card.Content extra>
                  <Icon name="call" /> {info.contact}
                  <br />
                  <Icon name="location arrow" /> {info.loc}
                </Card.Content>
              </Card>
            ))
          ) : loading ? (
            <h3>Loading...</h3>
          ) : (
            <Message>
              <Message.Header>No data to show</Message.Header>
              <p>There isnt any data to show right now</p>
            </Message>
          )}
        </div>
      </div>
      <div className="sidebar-toggle" onClick={() => setShowSidebar(true)}>
        <Icon name="sidebar" size="big" />
      </div>
    </div>
  );
}

export default NeedResources;
