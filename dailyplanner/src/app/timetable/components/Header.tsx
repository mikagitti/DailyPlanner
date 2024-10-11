'use client'
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getWeekdayInLanguage } from "../misc/TimeHandle";
import { getWeather } from "./tableSetup/API/Weather";


export default function Header() {

     const [temperature, setTemperature] = useState('??? °C');

     useEffect(() => {
          const getWeatherFromAPI = async () => {
               const weather = await getWeather();
               if (weather && weather.main && weather.main.temp) {
                    console.log('WEATHER is: ' + weather.main.temp);
                    setTemperature(weather.main.temp + ' °C');
               }

          };
          getWeatherFromAPI();
     }, []);

     return (
          <>
               <Container>
                    <Row>
                         {colToShow(getWeekdayInLanguage(new Date(), 'en-EN').toUpperCase())}
                         {colToShow(new Date().toLocaleDateString("en-EN"))}
                         {colToShow(temperature)}
                         {colToShow(<Link href="/">Home</Link>)}
                    </Row>
               </Container>
          </>
     );

     function colToShow(content: any) {
          return (
               <Col xs={6} md={3}>
                    <div className="custom-header-box">{content}</div>
               </Col>
          );
     }
}
