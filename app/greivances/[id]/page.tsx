"use client";
import IndividualGreivancePage from "@/components/IndividualGreivance";
import { useParams } from "next/navigation";

const GreivanceDetails = () => {
  const params = useParams();
  const id = params.id as string;
  return <IndividualGreivancePage greivanceId={id} />;
};

export default GreivanceDetails;
