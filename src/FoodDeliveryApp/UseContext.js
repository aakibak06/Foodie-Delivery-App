import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <AppContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AppContext.Provider>
    )
}


export { AppContext, AppProvider }