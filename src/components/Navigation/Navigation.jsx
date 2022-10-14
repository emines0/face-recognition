import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {

        if(isSignedIn) {
            return (
                <nav style={{display:'flex', justifyContent:'flex-end'}}> {/*align items in nav to the end of component (RIGHT)*/}
                    <p 
                    onClick={() => onRouteChange('signout')}  //arrow function before secure that the function will runon click event not when rendered
                    className="f3 link dim black underline pa3 pointer">

                        Sign Out

                    </p>
                </nav>
            )
        }else { 
            return (
                <nav style={{display:'flex', justifyContent:'flex-end'}}> {/*align items in nav to the end of component (RIGHT)*/}
                    <p 
                    onClick={() => onRouteChange('signin')}  //arrow function before secure that the function will runon click event not when rendered
                    className="f3 link dim black underline pa3 pointer">
        
                        Sign In
        
                    </p>
                    <p 
                    onClick={() => onRouteChange('register')}  //arrow function before secure that the function will runon click event not when rendered
                    className="f3 link dim black underline pa3 pointer">
        
                        Register
        
                    </p>
                </nav>

            )

        }
}

export default Navigation;