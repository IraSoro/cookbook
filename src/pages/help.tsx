import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Container, Typography } from "@mui/material";

import Tickets from "@/components/ticket";
import { Ticket } from "@/pages/api/routes/tickets";

import "../app/globals.css";

const HelpPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Ticket[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/auth");
    } else {
      loadTasks();
    }
  }, [router]);

  const loadTasks = async () => {
    try {
      const response = await fetch("/api/routes/tickets");
      const tickets = await response.json();
      setTasks(tickets.data);
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  return (
    <main>
      <Container style={{ height: "100vh" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My tickets
        </Typography>
        <Tickets tickets={tasks} />
      </Container>
    </main>
  );
};

export default HelpPage;
