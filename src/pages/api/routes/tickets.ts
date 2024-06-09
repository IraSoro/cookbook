import type { NextApiRequest, NextApiResponse } from "next";

export interface Ticket {
  id: number;
  summary: string;
  description: string;
  username: string;
  currentPageUrl: string;
  priority: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        console.log("1111111111");
        const { summary, description, priority, currentPageUrl, username } =
          req.body;
        console.log("222222222222");
        let headersList = {
          Authorization: `Basic ${process.env.JIRA_AUTH_BASE64}`,
          "Content-Type": "application/json",
        };
        console.log("3333333333");
        let bodyContent = JSON.stringify({
          fields: {
            project: {
              key: process.env.JIRA_KEY,
            },
            summary: summary,
            description: description,
            issuetype: {
              name: "Task",
            },
            customfield_10033: username,
            customfield_10034: currentPageUrl,
          },
        });
        console.log("4444444444444");
        let response = await fetch(
          `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/2/issue`,
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );
        console.log("555555555555");
        let data = await response.json();
        console.log("data = ", data);
        res.status(200).json({ ticketUrl: data.self });
      }
      case "GET": {
        const { searchUsername } = req.query;
        let jql = encodeURIComponent(`Username ~ "${searchUsername}"`);

        let headersList = {
          Authorization: `Basic ${process.env.JIRA_AUTH_BASE64}`,
        };

        let response = await fetch(
          `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/2/search?jql=${jql}`,
          {
            method: "GET",
            headers: headersList,
          }
        );

        let data = await response.json();
        const tickets: Ticket[] = data.issues.map((issue: any) => ({
          id: issue.id,
          summary: issue.fields.summary,
          description: issue.fields.description,
          username: issue.fields.customfield_10033,
          currentPageUrl: issue.fields.customfield_10034,
          priority: issue.fields.priority.name,
          status: issue.fields.status.name,
        }));
        res.status(200).json({ data: tickets });
      }
      default: {
        throw "Unknown method";
      }
    }
  } catch (err) {
    console.log("err = ", err);
    res.status(400).json({ error: err });
  }
}
