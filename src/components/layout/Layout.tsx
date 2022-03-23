import { FunctionComponent, Fragment } from "react";
import classes from "./Layout.module.css";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  return (
    <Fragment>
      <main className={"container-fluid"}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
