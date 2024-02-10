import { StateContext } from "@/context/stateContext";
import { useContext } from "react";

export const useStateContext = () => useContext(StateContext);