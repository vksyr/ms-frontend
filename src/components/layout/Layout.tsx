import { FunctionComponent, Fragment } from "react";
import { Container } from "react-bootstrap";
import classes from "./Layout.module.css";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  return (
    <Fragment>
      <main>
        <Container fluid>{props.children}</Container>
      </main>
    </Fragment>
  );
};

export default Layout;
