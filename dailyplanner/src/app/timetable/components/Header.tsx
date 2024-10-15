'use client'
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { formatDate, getWeekdayInLanguage } from "../misc/TimeHandle";
import { getWeatherTemperatureAndIcon, showWeatherIcon, weatherDataType } from "./tableSetup/API/Weather";

const weatherFetchingInterval: number = 2 * 60 * 1000;  // 2 minutes interval for fetching weather data

export default function Header() {

     const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);

     useEffect(() => {
          getWeatherFromAPI();
          const weatherInterval = setInterval(() => {
               getWeatherFromAPI();
          }, weatherFetchingInterval);

          return () => clearInterval(weatherInterval); // Cleanup interval on component unmount
     }, []);

     return (
          <Container>
               <Row>
                    {colToShow(getWeekdayInLanguage(new Date(), 'en-EN').toUpperCase())}
                    {colToShow(formatDate(new Date()))}
                    {colToShow(showWeather())}
                    {colToShow(<Link href="/"><FontAwesomeIcon icon={faHome} fontSize='1.8rem' /></Link>)}
               </Row>
          </Container>
     );

     function colToShow(content: any, fontSize: string = '1.5em') {
          return (
               <Col xs={6} md={3}>
                    <div className="custom-header-box" style={{ fontSize: fontSize }}>{content}</div>
               </Col>
          );
     }

     function showWeather() {
          if (weatherData === null) {
               return;
          }
          return (
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {weatherData?.temperature} °C
                    <span>
                         {showWeatherIcon(weatherData)}
                    </span>
               </div>
          );
     }

     function getWeatherFromAPI() {
          getWeatherTemperatureAndIcon().then((weather) => {
               setWeatherData(weather);
          });
     }

}
