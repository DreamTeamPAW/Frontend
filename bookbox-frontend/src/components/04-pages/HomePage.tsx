import { tertiaryTextLabelStyle } from "@/styles/classes";
import Link from "next/link";
import NavBar from "../01-molecules/NavBar";
import PaginationAndFilter from "../02-organisms/PaginationAndFilter";
import Label from "../00-atoms/Label";
import HomepageTemplate from "../03-templates/HomepageTemplate";


  const HomePage: React.FC = () => {
    return (
        <HomepageTemplate/>
    );
  };

export default HomePage;