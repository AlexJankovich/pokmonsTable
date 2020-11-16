import React from 'react';

type Error404PageType = {
    message:string
}

export const Error404 = (props:Error404PageType)=>{
    return <div>{props.message ||" ERROR 404 NOT FOUND"}</div>
}
