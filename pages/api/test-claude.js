// pages/api/test-claude.js
import { Anthropic } from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  try {
    console.log("Testing Claude API");
    
    // Sample data for testing
    const sampleData = {
      billableHoursData: [
        { month: 'Jan', billable: 1420, nonBillable: 340 },
        { month: 'Feb', billable: 1580, nonBillable: 320 },
        { month: 'Mar', billable: 1650, nonBillable: 280 }
      ],
      practiceAreaData: [
        { name: 'Corporate', value: 42 },
        { name: 'Litigation', value: 28 },
        { name: 'Real Estate', value: 15 }
      ],
      attorneyPerformanceData: [
        { name: 'Smith, J.', billable: 168, revenue: 42000 },
        { name: 'Johnson, A.', billable: 182, revenue: 45500 }
      ]
    };
    
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      system: "You are a legal business intelligence analyst. Provide insights about legal data.",
      messages: [
        {
          role: "user",
          content: `Which practice area is most profitable? Here's the data: ${JSON.stringify(sampleData)}`
        }
      ],
    });

    // Return Claude's response
    res.status(200).json({ 
      success: true,
      message: message.content[0].text
    });
  } catch (error) {
    console.error('Error testing Claude API:', error);
    res.status(500).json({ 
      error: 'Error testing Claude API',
      message: error.message
    });
  }
}
