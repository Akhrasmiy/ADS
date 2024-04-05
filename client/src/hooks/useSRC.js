import { useState } from "react";
export default function useSRC(value){
const[src,setsrc]=useState(value)
return [src,setsrc]
}