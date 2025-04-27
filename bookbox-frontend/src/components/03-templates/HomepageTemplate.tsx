"use client"
import React, { useState } from "react";
import NavBar from "../01-molecules/NavBar";
import PaginationAndFilter from "../02-organisms/PaginationAndFilter";



const HomepageTemplate: React.FC = ({  }) => {
    const [filter, setFilter] = useState("");
    const [pageSize, setPageSize] = useState(15);  
  return (
    <div>
        <NavBar/>
        <img src="/images/Booknav.png" alt="Logo" className="h-20 w-full bg-repeat-x" draggable="false"  />
        <PaginationAndFilter      
            filter={filter}
            setFilter={setFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
    />
    </div>  
  );
};

export default HomepageTemplate;
