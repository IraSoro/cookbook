import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        const { summary, description, priority, currentPageUrl, username } =
          req.body;
        let headersList = {
          Authorization: `Basic ${process.env.JIRA_AUTH_BASE64}`,
          "Content-Type": "application/json",
        };
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
        let response = await fetch(
          `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/2/issue`,
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let data = await response.json();
        res.status(200).json({ ticketUrl: data.self });
      }
      default: {
        throw "Unknown method";
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
