import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3a8fc294-91a2-4bc4-bc25-d7377a3da932");
  }, []);
  return null;
};