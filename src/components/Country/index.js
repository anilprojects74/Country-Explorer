import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, notification, Skeleton, Button } from "antd"; // Import notification
import { motion } from "framer-motion";

export default function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false)

  const country_name = useMemo(() => name || "india", [name]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country_name}`);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Country not found");
        setLoading(false);
        notification.error({
          message: 'API Call Failed',
          description: `Could not fetch data for ${country_name}. Please check the country name and try again.`,
          placement: 'topRight',
        });
      }
    };
    fetchCountryData();
  }, [country_name, trigger]);

  if (loading) {
    return (
      <Row className="max-w-xl h-auto w-full bg-white rounded-md overflow-hidden m-6">
        <Col span={24} className="w-full h-72 object-cover p-0">
        </Col>
        <Col span={24} className="mt-1 p-4">
          <Skeleton active paragraph={{rows:7}} />
        </Col>
      </Row>
    );
  }

  if (error){
    return (
      <Row className="max-w-xl h-auto w-full bg-white rounded-md overflow-hidden m-6">
        <Col span={24} className="w-full h-72 object-cover p-0">
        </Col>
        <Col span={24} className="mt-1 p-4">
          <p>Could not fetch data for ${country_name}. Please check the country name and try again.</p>
          <Button onClick={()=>setTrigger(!trigger)}>Try again</Button>
        </Col>
      </Row>
    )
  }

  const {
    flags,
    name: countryName,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    demonyms,
    tld,
    maps,
    latlng,
    independent,
  } = country;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row h-auto p-4"
      >
        <Row className="max-w-xl h-auto w-full bg-white rounded-md overflow-y-auto">
          <Col span={24} className="p-0">
            <motion.img
              src={flags.png}
              alt={`Flag of ${countryName.common}`}
              className="w-full h-52 object-cover p-0"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
          <Col sm={24}>
            <motion.h2
              className="text-3xl font-semibold mb-4 text-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {countryName.common}
            </motion.h2>
          </Col>
          <Col sm={24}>
            <p className="mb-4 p-1">
              <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
          <Col xs={24} sm={12}  className="p-1">
            <p><strong>Official Name:</strong> {countryName.official}</p>
            <p><strong>Capital:</strong> {capital?.[0]}</p>
            <p><strong>Region:</strong> {region}</p>
            <p><strong>Subregion:</strong> {subregion}</p>
            <p><strong>Top-Level Domain:</strong> {tld.join(", ")}</p>
          </Col>
          <Col xs={24} sm={12} className="p-1">
            <p><strong>Population:</strong> {population.toLocaleString()}</p>
            <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> {Object.values(languages || {}).join(", ")}</p>
            <p><strong>Currencies:</strong>{" "}
              {Object.values(currencies || {})
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ")}
            </p>
            <p><strong>Demonyms:</strong> {demonyms?.eng?.m} (Male), {demonyms?.eng?.f} (Female)</p>
          </Col>
          <Col span={24} className="p-1">
            <p><strong>Coordinates:</strong> Latitude {latlng[0]}, Longitude {latlng[1]}</p>
            <p><strong>Independent:</strong> {independent ? "Yes" : "No"}</p>
            <p>
              <strong>Maps:</strong> 
              <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer"> Google Maps</a>, 
              <a href={maps.openStreetMaps} target="_blank" rel="noopener noreferrer"> OpenStreetMap</a>
            </p>
          </Col>
        </Row>
      </motion.div>
    </>
  );
}
