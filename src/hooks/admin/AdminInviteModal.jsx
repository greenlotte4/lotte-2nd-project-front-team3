import { useState } from "react";

export default function useAdminInviteModal() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [department, setDepartment] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");

  return {
    name,
    mail,
    department,
    rank,
    role,
    note,
    setName,
    setMail,
    setDepartment,
    setRank,
    setRole,
    setNote,
  };
}
