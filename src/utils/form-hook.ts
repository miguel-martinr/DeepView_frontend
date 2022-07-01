import React, { ChangeEvent, useState } from "react"




export const useFormFields = (initialState: any) => {
  const [fields, setValues] = useState(initialState);

  const eventSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  }

  const normalSetter = (newState: any) => {
    setValues({
      ...fields,
      ...newState,
    });
  }

  const setterWrapper = (ev: any) => {
    if (ev.target) return eventSetter(ev);
    return normalSetter(ev);
  }

  return [
    fields,
    setterWrapper,  
  ];
}