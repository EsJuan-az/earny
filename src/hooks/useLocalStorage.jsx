import { useLayoutEffect, useState } from "react";

function useLocalStorage(itemName, defaultValue = null){
    const [item, $setItem] = useState(defaultValue);
    const setItem = (value) => {
        $setItem(value);
        const stringValue = JSON.stringify(value);
        localStorage.setItem(itemName, stringValue);
    };
    useLayoutEffect(() => {
        const value = localStorage.getItem(itemName);
        if( !value ) return;
        const JSONValue = JSON.parse(value);
        $setItem(JSONValue);
    }, [ itemName ]);
    return [item, setItem];
}
export default useLocalStorage;