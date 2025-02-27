// import Formlogin from "./Formlogin"
// export default function Telalogin(props){
//     return(
//         <Formlogin/>
//     )
// }


// import Formlogin from "./Formlogin";
// import Container from "react-bootstrap/Container";
// import Card from "react-bootstrap/Card";

// export default function Telalogin(props) {
//     return (
//         <Container className=" bg-dark d-flex justify-content-center align-items-center vh-100">
//             <Card className="p-5 shadow-lg w-2 ">
//                 <Formlogin />
//             </Card>
//         </Container>
//     );
// }

import Formlogin from "./Formlogin";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function Telalogin(props) {
    return (
        <Container className="bg-success-subtle d-flex justify-content-center align-items-center vh-100">
            <Card className="p-5 shadow-lg rounded w-50">
                <Formlogin />
            </Card>
        </Container>
    );
}

