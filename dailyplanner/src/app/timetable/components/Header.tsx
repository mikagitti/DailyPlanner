import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { getWeekdayInLanguage } from "../misc/TimeHandle";

export default function Header() {
     return (
          <>
               <Container>
                    <Row>
                         {colToShow(getWeekdayInLanguage(new Date(), 'en-EN').toUpperCase())}
                         {colToShow(new Date().toLocaleDateString("en-EN"))}
                         {colToShow("27°C")}
                         {colToShow(<Link href="/">Home</Link>)}
                    </Row>
               </Container>
          </>
     );

     function colToShow(content: any) {
          return (
               <Col>
                    <div className="custom-header-box">{content}</div>
               </Col>
          );
     }
}
