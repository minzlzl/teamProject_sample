import React, { createContext, useState } from 'react';

export const DataContext = createContext([]);

function ContextProvider({ children }) {
    const [data, setData] = useState([]);
    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
}

export default ContextProvider;
