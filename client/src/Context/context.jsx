import React ,{ createContext, useState } from "react";

export const userContext = createContext(null)


export default function Context ({children}) {
    const [user,setUser] = useState(null)

    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}