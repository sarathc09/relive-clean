import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import actionPlans from "../data/actionPlans";
import { validateReport } from "../utils/reportValidator";
import { REPORT, COLORS, PDF_LAYOUT } from "../constants/reportConstants";
function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}

pdfMake.vfs = pdfFonts.vfs;
const DESIGN = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32
  },

  colors: {
    border: "#E5E7EB",
    primary: "#047857",
    secondary: "#6B7280",
    text: "#111827"
  },

  card: {
    borderWidth: 0.8,
    padding: 16,
    margin: [0, 16, 0, 20]
  }
};
function cardLayout() {
  return {

    hLineWidth: () => DESIGN.card.borderWidth,
    vLineWidth: () => DESIGN.card.borderWidth,

    hLineColor: () => DESIGN.colors.border,
    vLineColor: () => DESIGN.colors.border,

    paddingTop: () => DESIGN.card.padding,
    paddingBottom: () => DESIGN.card.padding,
    paddingLeft: () => DESIGN.card.padding,
    paddingRight: () => DESIGN.card.padding

  };
}
function getScoreColor(score) {
    if (score >= 85) return "#10B981";   // Green
    if (score >= 70) return "#3B82F6";   // Blue
    if (score >= 55) return "#F59E0B";   // Orange
    return "#EF4444";                    // Red
  }


function getHealthStatus(score) {
  if (score >= 90) {
    return "Exceptional";
  }

  if (score >= 80) {
    return "Strong";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 60) {
    return "Needs Attention";
  }

  return "High Priority";
}
function createHealthSnapshotTable(healthDomains) {
  return {
    margin: [0, 10, 0, 25],

    table: {
      widths: ["55%", "20%", "25%"],

      body: [
        [
          {
            text: "Domain",
            bold: true,
            fillColor: "#10B981",
            color: "#FFFFFF",
            alignment: "center"
          },
          {
            text: "Score",
            bold: true,
            fillColor: "#10B981",
            color: "#FFFFFF",
            alignment: "center"
          },
          {
            text: "Status",
            bold: true,
            fillColor: "#10B981",
            color: "#FFFFFF",
            alignment: "center"
          }
        ],

        [
          "❤️ Heart Health",
          {
            text: healthDomains.heart,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.heart),
            alignment: "center"
          }
        ],

        [
          "🧠 Brain Health",
          {
            text: healthDomains.brain,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.brain),
            alignment: "center"
          }
        ],

        [
          "😴 Sleep",
          {
            text: healthDomains.sleep,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.sleep),
            alignment: "center"
          }
        ],

        [
          "⚡ Metabolism",
          {
            text: healthDomains.metabolism,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.metabolism),
            alignment: "center"
          }
        ],

        [
          "💪 Fitness",
          {
            text: healthDomains.fitness,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.fitness),
            alignment: "center"
          }
        ],

        [
          "🛡 Recovery",
          {
            text: healthDomains.recovery,
            alignment: "center"
          },
          {
            text: getHealthStatus(healthDomains.recovery),
            alignment: "center"
          }
        ]
      ]
    },

    layout: "lightHorizontalLines"
  };
}
function create30DayActionPlan(report) {
  
  const plan =
  actionPlans[report.weakestDomain] || actionPlans.sleep;
  return {
    stack: [

      {
        text: " 30-Day Action Plan",
        style: "sectionHeader"
      },

      {
        text:
          "Follow this personalised plan consistently over the next 30 days to maximise your projected longevity improvements.",
        color: "#6B7280",
        margin: [0, 0, 0, 15]
      },

      {
        table: {

          widths: ["24%", "76%"],

          body: [

            [
              {
                text: "Week 1",
                style: "tableHeader"
              },

              {
                ul: plan.week1
              }
            ],

            [
              {
                text: "Week 2",
               style: "tableHeader"
              },

              {
                ul: plan.week2
              }
            ],

            [
              {
                text: "Week 3",
                style: "tableHeader"
              },

              {
                ul: plan.week3
              }
            ],

            [
              {
                text: "Week 4",
               style: "tableHeader"
              },

              {
                ul: plan.week4
              }
            ]

          ]

        },

        layout: "lightHorizontalLines"

      }

    ]
  };

}

function getHealthInsights(healthDomains) {
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
  function createCover(report) {
    return {
      margin: [0, 0, 0, 25],
  
      stack: [
  
        {
          text: REPORT.BRAND_NAME,
          style: "reportTitle"
        },
  
        {
          text: REPORT.BRAND_NAME,
          style: "coverTitle"
        },
  
        {
          text: REPORT.REPORT_SUBTITLE,
          style: "coverSubtitle"
        },
  
        {
          text: "CONFIDENTIAL",
          style: "confidential"
        },
  
        {
          canvas: [
              {
                  type: "line",
                  x1: 0,
                  y1: 0,
                  x2: 515,
                  y2: 0,
                  lineWidth: 2,
                  lineColor: "#10B981"
              }
          ],
          margin: [0,30,0,10]
      }
      ]
    };
  }
  function createParticipantSection(report) {

    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  
    return {

      margin: DESIGN.card.margin,
    
      table: {
    
        widths: ["*", "*"],
    
        body: [
    
          [
    
            {
    
              stack: [
    
                {
                  text: "PARTICIPANT",
                  style: "metricLabel"
                },
    
                {
                  text: report.name,
                  fontSize: 16,
                  bold: true,
                  color: "#111827",
                  margin: [0, 6, 0, 0]
                }
    
              ]
    
            },
    
            {
    
              stack: [
    
                {
                  text: "GENERATED ON",
                  style: "metricLabel",
                  alignment: "right"
                },
    
                {
                  text: today,
                  fontSize: 12,
                  color: "#111827",
                  alignment: "right",
                  margin: [0, 6, 0, 0]
                }
    
              ]
    
            }
    
          ]
    
        ]
    
      },
    
      layout: cardLayout()
    
    };
  
  }
  function createScoreCard(report) {

    const status =
      report.score >= 80
        ? "EXCEPTIONAL"
        : report.score >= 65
        ? "STRONG"
        : report.score >= 50
        ? "GOOD"
        : "NEEDS ATTENTION";
  
    return {
  
      margin: [0, 15, 0, 25],
  
      table: {
  
        widths: ["*"],
  
        body: [
  
          [
  
            {
  
              stack: [
  
                {
                  text: "OVERALL LONGEVITY SCORE",
                  style: "metricLabel",
                  alignment: "center"
                },
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 180,
                      y1: 0,
                      x2: 230,
                      y2: 0,
                      lineWidth: 0.5,
                      lineColor: "#E5E7EB"
                    }
                  ],
                  margin: [0, 8, 0, 12]
                },
                {
                  text: `${report.score}`,
                  style: "metricValue",
                  fontSize: 50,
                  color: getScoreColor(report.score),
                  margin: [0, 2, 0, 2]
                },
  
                {
                  text: status,
                  alignment: "center",
                  bold: true,
                  color: "#FFFFFF",
                  fillColor: getScoreColor(report.score),
                  margin: [150, 8, 150, 8]
                },
                {
                  table: {
                
                    widths: ["55%", "45%"],
                
                    body: [
                
                      [
                        {
                          text: "Biological Age",
                          bold: true,
                          color: "#6B7280"
                        },
                
                        {
                          text: `${report.biologicalAge} Years`,
                          alignment: "right",
                          bold: true
                        }
                
                      ],
                
                      [
                
                        {
                          text: "Chronological Age",
                          bold: true,
                          color: "#6B7280"
                        },
                
                        {
                          text: `${report.chronologicalAge} Years`,
                          alignment: "right",
                          bold: true
                        }
                
                      ]
                
                    ]
                
                  },
                
                  layout: "noBorders",
                
                  margin: [60,8,60,0]
                }
  
              ],
  
              margin: [16, 8, 16, 8]
  
            }
  
          ]
  
        ]
  
      },
  
      layout: {
        hLineWidth: () => 0.8,
        vLineWidth: () => 0.8,
        hLineColor: () => "#E5E7EB",
        vLineColor: () => "#E5E7EB"
      }
  
    };
  
  }
  function createSummaryCards(report, ageDifference) {

    return {
  
      columns: [
  
        {
  
          width: "38%",
  
          stack: [
  
            {
  
              text: "Age Summary",
  
              style: "sectionHeader"
  
            },
  
            {
  
              table: {
  
                widths: ["68%", "32%"],
  
                body: [
  
                  [
  
                    {
  
                      text: "Estimated Biological Age",
  
                      style: "metricLabel"
  
                    },
  
                    {
  
                      text: `${report.biologicalAge} Years`,
  
                      bold: true,
  
                      color: "#111827"
  
                    }
  
                  ],
  
                  [
  
                    {
  
                      text: "Chronological Age",
  
                      style: "metricLabel"
  
                    },
  
                    {
  
                      text: `${report.chronologicalAge} Years`,
  
                      bold: true,
  
                      color: "#111827"
  
                    }
  
                  ],
  
                  [
  
                    {
  
                      text: "Difference",
  
                      style: "metricLabel"
  
                    },
  
                    {
  
                      text:
  
                        ageDifference >= 0
  
                          ? `${ageDifference} Years Younger`
  
                          : `${Math.abs(ageDifference)} Years Older`
  
                    }
  
                  ],
  
                 
  
                ]
  
              },
  
              layout: "lightHorizontalLines"
  
            }
  
          ]
  
        },
  
        {
  
          width: "62%",
  
          stack: [
  
            {
  
              text: "Executive Summary",
  
              style: "sectionHeader"
  
            },
  
            {
              text: report.summaryData.executiveSummary,
              lineHeight: 1.4,
              margin: [8, 4, 8, 4]
            }
  
          ]
  
        }
  
      ],
  
      columnGap: 25,
  
      margin: [0, 12, 0, 0]
  
    };
  
  }
export function generateLongevityPDF(report) {
  try {

  validateReport(report);

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
  footer: function (currentPage, pageCount) {
    return {
      margin: [40, 10, 40, 15],
  
      columns: [
  
        {
          width: "*",
          text: "ReLive Longevity Report",
          fontSize: 9,
          color: "#6B7280",
          margin: [0, 0, 10, 0]
        },
  
        {
          width: "auto",
          text: "Confidential",
          fontSize: 9,
          color: "#6B7280",
          alignment: "center",
          margin: [10, 0, 10, 0]
        },
  
        {
          width: "auto",
          text: `Page ${currentPage} of ${pageCount}`,
          fontSize: 9,
          color: "#6B7280",
          alignment: "right",
          margin: [10, 0, 0, 0]
        }
  
      ],
  
      canvas: [
        {
          type: "line",
          x1: 155,
          y1: 0,
          x2: 245,
          y2: 0,
          lineWidth: 0.5,
          lineColor: "#E5E7EB"
        }
      ]
    };
  },

  content: [
    createCover(report),
    

    
    createParticipantSection(report),
    createScoreCard(report),
    

    createSummaryCards(report, ageDifference),
      {
        pageBreak: "before",
        text: "Health Snapshot",
        style: "sectionHeader"
      },
      createHealthSnapshotTable(report.healthDomains),
      
{
    margin: [0, 30, 0, 0],
  
    stack: [
  
      {
        text: "Health Insights",
        style: "sectionHeader"
      },
      {
        
        text: "Your AI Longevity Plan",
        style: "sectionHeader"
      },
      {
        margin: [0, 15, 0, 20],
      
        table: {
      
          widths: ["40%", "60%"],
      
          body: [
      
            [
              {
                text: "Priority Focus",
                style: "tableHeader"
                
              },
      
              {
                text: capitalize(
                  report.weakestDomain
                )
              }
      
            ],
      
            [
              {
                text: "Recommended First Action",
               style: "tableHeader"
              },
      
              {
                text:
                  report.topInterventions?.[0]?.title || "No recommendation"
              }
      
            ]
      
          ]
      
        },
      
        layout: "lightHorizontalLines"
      
      },
      {
       
      
        text: "Why this recommendation",
      
        style: "sectionHeader"
      },
      
      {
        text: report.explanation,
      
        lineHeight: 1.5,
      
        margin: [0, 0, 0, 20]
      },
      {
        text: "Expected Benefits",
       style: "sectionHeader"
      },
      
      {
        ul: [
          `Longevity Score Improvement: ${
            report.topInterventions?.[0]?.expectedImpact?.longevityScore || "N/A"
          }`,
      
          `Estimated Biological Age Improvement: ${
            report.topInterventions?.[0]?.expectedImpact?.biologicalAge || "N/A"
          }`,
      
          `Safety Rating: ${
            report.topInterventions?.[0]?.safety?.rating || "N/A"
          }`
        ],
      
        margin: [15, 0, 0, 20]
      },
     { 
      unbreakable: true,
      stack:[{
        text: "📈 Projected Improvement",
        style: "sectionHeader"
      },
      
      {
        text:
          "Based on consistent adherence to your personalised plan for approximately 90 days.",
        color: "#6B7280",
        margin: [0, 0, 0, 15]
      },
      
      {
        table: {
          widths: ["50%", "50%"],
      
          body: [
      
            [
              {
                text: "Longevity Score",
                style: "tableHeader"
              },
      
              {
                text: "Biological Age",
                 style: "tableHeader"
              }
            ],
      
            [
              {
                stack: [
                  {
                    text: `${report.score} to ${Math.min(
                      100,
                      report.score + 4
                    )}`,
                   style: "sectionHeader"
                  },
      
                  {
                    text: "+4 Estimated Points",
                    alignment: "center",
                    margin: [0, 8, 0, 0]
                  }
                ]
              },
      
              {
                stack: [
                  {
                    text: `${report.biologicalAge} to ${(
                      report.biologicalAge - 1.5
                    ).toFixed(1)}`,
                   style: "sectionHeader"
                  },
      
                  {
                    text: "-1.5 Estimated Years",
                    alignment: "center",
                    margin: [0, 8, 0, 0]
                  }
                ]
              }
      
            ]
      
          ]
        },
      
        layout: "lightHorizontalLines",
      
        margin: [0, 10, 0, 20]
      },
      
      {
        text:
          "These projected outcomes are estimates based on current scientific evidence and assume consistent adherence to your personalised programme. Individual results may vary.",
        italics: true,
        color: "#6B7280",
        margin: [0, 0, 0, 20]
      },
      {
        margin: [0, 12, 0, 0],
      
        text:
          "Assessment confidence is based on questionnaire responses and should be interpreted as an estimate rather than a laboratory-confirmed measurement.",
      
        fontSize: 9,
        italics: true,
        color: "#6B7280"
      },]
    },
      create30DayActionPlan(report),
      
       
      {
        text: "Final Summary & Scientific References",
        style: "sectionHeader",
        pageBreak: "before"
      },
      ...(report.topInterventions?.[0]?.references || []).map(ref => ({

        margin: [0, 8, 0, 8],
      
        table: {
      
          widths: ["*"],
      
          body: [[
      
            {
      
              stack: [
      
                {
                  text: ref.organisation,
                  bold: true,
                  color: "#111827",
                  fontSize: 12
                },
      
                {
                  text: ref.type,
                  color: "#6B7280",
                  fontSize: 10,
                  margin: [0, 3, 0, 0]
                }
      
              ]
      
            }
      
          ]]
      
        },
      
        layout: cardLayout()
      
      })),
      {
        unbreakable: true,
        columns: [
  
          
          {
            width: "50%",
          
            table: {
          
              widths: ["*"],
          
              body: [[
          
                {
          
                  stack: [
          
                    {
                      text: "⭐ Strongest Domain",
                      bold: true,
                      color: "#10B981",
                      margin: [0, 0, 0, 10]
                    },
          
                    {
                      text: `${capitalize(insights.strongest[0])} (${insights.strongest[1]})`,
                      fontSize: 16,
                      bold: true,
                      color: "#111827",
                      margin: [0, 0, 0, 10]
                    },
          
                    {
                      text:
                        "This is currently your strongest area. Continue maintaining these habits to support long-term healthy aging.",
                      lineHeight: 1.5
                    }
          
                  ]
          
                }
          
              ]]
          
            },
          
            layout: cardLayout()
          },
  
          {
            width: "50%",
          
            table: {
          
              widths: ["*"],
          
              body: [[
          
                {
          
                  stack: [
          
                    {
                      text: "⚠ Biggest Opportunity",
                      bold: true,
                      color: "#F59E0B",
                      margin: [0, 0, 0, 10]
                    },
          
                    {
                      text: `${capitalize(insights.weakest[0])} (${insights.weakest[1]})`,
                      fontSize: 16,
                      bold: true,
                      color: "#111827",
                      margin: [0, 0, 0, 10]
                    },
          
                    {
                      text:
                        "Improving this health domain is likely to have the greatest impact on your overall longevity score.",
                      lineHeight: 1.5
                    }
          
                  ]
          
                }
          
              ]]
          
            },
          
            layout: cardLayout()
          }
  
        ],
  
        columnGap: 25
      },
    ]
  },
  
    
  

  ],
  styles: {
    coverTitle: {
      fontSize: 20,
      bold: true,
      alignment: "center",
      color: "#111827",
      margin: [0, 8, 0, 10]
    },
    
    coverSubtitle: {
      fontSize: 12,
      alignment: "center",
      color: "#6B7280",
      margin: [0, 0, 0, 16]
    },
    
    confidential: {
      fontSize: 11,
      bold: true,
      alignment: "center",
      color: "#DC2626",
      margin: [0, 0, 0, 20]
    },
    
    reportTitle: {
      fontSize: 28,
      bold: true,
      color: COLORS.PRIMARY,
      alignment: "center",
      margin: [0, 0, 0, 8]
    },
    metricLabel: {
      fontSize: 10,
      bold: true,
      color: "#6B7280"
    },
    
    metricValue: {
      fontSize: 22,
      bold: true,
      color: COLORS.TEXT,
      alignment: "center"
    },
    
    pageTitle: {
      fontSize: 20,
      bold: true,
      color: "#111827",
      alignment: "center",
      margin: [0, 20, 0, 15]
    },
    
    tableCell: {
      fontSize: 11,
      color: "#374151"
    },
  
    reportSubtitle: {
      fontSize: 12,
      color: "#6B7280",
      alignment: "center",
      margin: [0, 0, 0, 24]
    },
  
    sectionHeader: {
      fontSize: 18,
      bold: true,
      color: "#111827",
      margin: [0, 20, 0, 10]
    },
  
    subHeader: {
      fontSize: 14,
      bold: true,
      color: "#047857",
      margin: [0, 18, 0, 8]
    },
  
    body: {
      fontSize: 11,
      color: "#374151",
      lineHeight: 1.5
    },
  
    caption: {
      fontSize: 10,
      italics: true,
      color: "#6B7280"
    },
  
    small: {
      fontSize: 9,
      color: "#9CA3AF"
    },
  
    tableHeader: {
      fontSize: 11,
      bold: true,
      color: "#FFFFFF",
      fillColor: "#047857",
      alignment: "center",
      margin: [0, 2, 0, 2]
    },
  
  }
};

pdfMake.createPdf(docDefinition).download(
  "ReLive-Longevity-Report.pdf"
);

} catch (error) {console.error("Failed to generate PDF:", error);

  throw new Error(
    `Unable to generate the report. ${error.message}`
  );

}

}