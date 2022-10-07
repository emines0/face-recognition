import React from "react";

const Navigation = () => {
    return (
        <nav style={{display:'flex', justifyContent:'flex-end'}}> {/*align items in nav to the end of component (RIGHT)*/}
            <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
    );
}

export default Navigation;