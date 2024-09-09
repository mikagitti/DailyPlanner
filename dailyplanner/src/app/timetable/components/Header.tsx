import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function Header() {
     return (
          <>
               <Container>
                    <Row>
                         {colToShow(
                              new Date()
                                   .toLocaleDateString("fi-FI", {
                                        weekday: "long",
                                   })
                                   .toLocaleUpperCase()
                         )}

                         {colToShow(new Date().toLocaleDateString("fi-FI"))}

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
