import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;
function getScoreColor(score) {
    if (score >= 85) return "#10B981";   // Green
    if (score >= 70) return "#3B82F6";   // Blue
    if (score >= 55) return "#F59E0B";   // Orange
    return "#EF4444";                    // Red
  }
  function getHealthGrade(score) {
    if (score >= 85) return "EXCELLENT";
    if (score >= 70) return "GOOD";
    if (score >= 55) return "FAIR";
    return "NEEDS IMPROVEMENT";
  }
function createHealthRow(label, score) {
  return {
    table: {
      widths: [120, "*", 40],
      body: [[
        {
          text: label,
          bold: true,
          margin: [0, 8, 0, 8]
        },
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 4,
              w: score * 2,
              h: 16,
              color: getScoreColor(score)
            },
            {
              type: "rect",
              x: score * 2,
              y: 4,
              w: 200 - score * 2,
              h: 16,
              color: "#E5E7EB"
            }
          ]
        },
        {
          text: String(score),
          alignment: "right",
          bold: true
        }
      ]]
    },
    layout: "noBorders",
    margin: [0, 0, 0, 15]
  };
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}function getHealthInsights(healthDomains) {
    const entries = Object.entries(healthDomains);
  
    const strongest = entries.reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
  
    const weakest = entries.reduce((a, b) =>
      a[1] < b[1] ? a : b
    );
  
    return {
      strongest,
      weakest
    };
  }

export function generateLongevityPDF(report) {
  console.log("Generating PDF...", report);

  const today = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const ageDifference =
  report.chronologicalAge - report.biologicalAge;
  const insights = getHealthInsights(report.healthDomains);

const docDefinition = {
  pageMargins: [40, 50, 40, 50],

  content: [

    {
      text: "ReLive",
      fontSize: 30,
      bold: true,
      color:  "#10B981",
      alignment: "center"
    },

    {
      text: "Longevity Assessment Report",
      fontSize: 18,
      margin: [0, 5, 0, 30],
      alignment: "center"
    },

    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 1,
          lineColor: "#dddddd"
        }
      ]
    },

    {
        margin: [0, 25, 0, 30],
        table: {
          widths: ["*", "*"],
          body: [
            [
              {
                stack: [
                  {
                    text: "Participant",
                    fontSize: 10,
                    color: "#6B7280"
                  },
                  {
                    text: report.name,
                    fontSize: 16,
                    bold: true
                  }
                ],
                margin: [10, 10, 10, 10]
              },
      
              {
                stack: [
                  {
                    text: "Assessment Date",
                    fontSize: 10,
                    color: "#6B7280",
                    alignment: "right"
                  },
                  {
                    text: today,
                    fontSize: 16,
                    bold: true,
                    alignment: "right"
                  }
                ],
                margin: [10, 10, 10, 10]
              }
      
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0
        }
      },
    {
        margin: [0, 30, 0, 10],
        text: "Overall Longevity Score",
        alignment: "center",
        fontSize: 18,
        bold: true
      },
      
      {
        text: `${report.score}`,
        alignment: "center",
        fontSize: 54,
        bold: true,
        color: getScoreColor(report.score),
        margin: [0, 10, 0, 5]
      },
      
      {
        margin: [0, 5, 0, 30],
      
        table: {
          widths: ["*"],
      
          body: [
            [
              {
                text:
                  report.score >= 80
                    ? "EXCELLENT"
                    : report.score >= 65
                    ? "GOOD"
                    : report.score >= 50
                    ? "FAIR"
                    : "HIGH RISK",
      
                alignment: "center",
                bold: true,
                color: "white",
      
                fillColor: getScoreColor(report.score),
      
                margin: [0, 8, 0, 8]
              }
            ]
          ]
        },
      
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 180,
          paddingRight: () => 180
        }
      },

      {
        columns: [
      
          // LEFT CARD
          {
            width: "38%",
      
            stack: [
      
              {
                text: "Age Summary",
                fontSize: 16,
                bold: true,
                color: "#10B981",
                margin: [0, 0, 0, 10]
              },
      
              {
                table: {
      
                  widths: ["*", "*"],
      
                  body: [
      
                    [
                      {
                        text: "Biological Age",
                        bold: true,
                        fillColor: "#F9FAFB"
                      },
      
                      {
                        text: `${report.biologicalAge} Years`
                      }
      
                    ],
      
                    [
      
                      {
                        text: "Chronological Age",
                        bold: true,
                        fillColor: "#F9FAFB"
                      },
      
                      {
                        text: `${report.chronologicalAge} Years`
                      }
      
                    ],
      
                    [
      
                      {
                        text: "Difference",
                        bold: true,
                        fillColor: "#F9FAFB"
                      },
      
                      {
                        text:
                          ageDifference >= 0
                            ? `${ageDifference} Years Younger`
                            : `${Math.abs(ageDifference)} Years Older`
                      }
      
                    ]
      
                  ]
      
                },
      
                layout: "lightHorizontalLines"
      
              }
      
            ]
      
          },
      
          // RIGHT CARD
      
          {
      
            width: "62%",
      
            stack: [
      
              {
                text: "Executive Summary",
                fontSize: 16,
                bold: true,
                color: "#10B981",
                margin: [0, 0, 0, 10]
              },
      
              {
      
                text: report.summaryData.summary,
      
                lineHeight: 1.5,
      
                margin: [10, 10, 10, 10]
      
              }
      
            ]
      
          }
      
        ],
      
        columnGap: 25,
      
        margin: [0, 20, 0, 0]
      },
      {
        pageBreak: "before",
        text: "Health Snapshot",
        style: "sectionHeader"
      },
      createHealthRow("Sleep", report.healthDomains.sleep),
      createHealthRow("Heart", report.healthDomains.heart),
createHealthRow("Brain", report.healthDomains.brain),
createHealthRow("Fitness", report.healthDomains.fitness),
createHealthRow("Recovery", report.healthDomains.recovery),
createHealthRow("Metabolism", report.healthDomains.metabolism),
{
    margin: [0, 30, 0, 0],
  
    stack: [
  
      {
        text: "Health Insights",
        style: "sectionHeader"
      },
  
      {
        columns: [
  
          {
            width: "50%",
  
            stack: [
  
              {
                text: "⭐ Strongest Domain",
                bold: true,
                color: "#10B981",
                margin: [0, 0, 0, 8]
              },
  
              {
                text: `${capitalize(insights.strongest[0])} (${insights.strongest[1]})`,
                fontSize: 16,
                bold: true
              },
  
              {
                text:
                  "This is currently your strongest area. Continue maintaining these habits to support long-term healthy aging.",
                margin: [0, 10, 0, 0],
                lineHeight: 1.4
              }
  
            ]
          },
  
          {
            width: "50%",
  
            stack: [
  
              {
                text: "⚠ Biggest Opportunity",
                bold: true,
                color: "#F59E0B",
                margin: [0, 0, 0, 8]
              },
  
              {
                text: `${capitalize(insights.weakest[0])} (${insights.weakest[1]})`,
                fontSize: 16,
                bold: true
              },
  
              {
                text:
                  "Improving this health domain is likely to have the greatest impact on your overall longevity score.",
                margin: [0, 10, 0, 0],
                lineHeight: 1.4
              }
  
            ]
          }
  
        ],
  
        columnGap: 25
      }
  
    ]
  },

  ],
  styles: {
    sectionHeader: {
      fontSize: 22,
      bold: true,
      color: "#10B981",
      margin: [0, 0, 0, 20]
    }
  }
};
pdfMake.createPdf(docDefinition).download(
    "ReLive-Longevity-Report.pdf"
  );
}