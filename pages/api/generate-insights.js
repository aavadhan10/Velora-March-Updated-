// pages/api/generate-insight.js
import { Anthropic } from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log("API request received");
    const { prompt, data } = req.body;
    
    // Check if we got valid data
    if (!data || !prompt) {
      console.error("Missing data or prompt in request");
      return res.status(400).json({ 
        error: 'Missing data or prompt',
        text: "I couldn't analyze your data because it wasn't provided correctly.",
        chartType: null,
        recommendation: "Please ensure your data is properly uploaded and try again."
      });
    }
    
    // Flexible data handling - work with whatever data structure is provided
    const processedData = processDataFlexibly(data);
    
    // If no valid data found after processing
    if (!processedData || Object.keys(processedData).length === 0) {
      console.error("No valid data found to analyze");
      return res.status(400).json({ 
        error: 'No valid data found',
        text: "I couldn't find any valid data to analyze. Your CSV file might not contain the expected fields or format.",
        chartType: null,
        recommendation: "Upload a CSV file with billable hours, practice area, and attorney information."
      });
    }
    
    console.log("Preparing data for Claude");
    // Prepare a simplified data string to prevent token limits
    let dataString;
    try {
      // Limit sample size for large datasets
      dataString = JSON.stringify(processedData, null, 2);
    } catch (err) {
      console.error("Error stringifying data:", err);
      dataString = JSON.stringify({
        error: "Data too large to process",
        sample: processedData.sample || []
      });
    }
    
    // Enhanced prompt with data structure information
    const enhancedPrompt = createEnhancedPrompt(prompt, processedData);
    
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    console.log("Calling Claude API");
    
    // Construct message to Claude
    const systemPrompt = `You are a legal business intelligence analyst for Velora AI, a platform that helps law firms analyze their practice data. 
      You'll be given data from a law firm's practice management system and asked to analyze it.
      Provide thoughtful, data-driven insights that would be valuable to law firm partners and managers.
      Always include specific numbers and metrics in your analysis.
      
      The data provided will be in JSON format. It might contain various fields depending on what was uploaded.
      If certain fields are missing, work with the data that is available.
      
      Format your response as JSON with these fields:
      - text: The main insight text (markdown format is fine)
      - chartType: Suggested visualization type ('bar', 'line', 'pie', or 'gauge')
      - recommendation: A specific recommendation based on the data
    `;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `${enhancedPrompt}\n\nHere is the data to analyze:\n\n${dataString}`
        }
      ],
    });

    console.log("Claude API response received");
    
    // Parse Claude's response
    let responseJSON;
    try {
      // Try to extract JSON from Claude's response
      const responseText = message.content[0].text;
      console.log("Raw response from Claude:", responseText);
      
      // Look for JSON in the response
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                      responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        responseJSON = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        // If no JSON formatting, create it from the text
        responseJSON = {
          text: responseText,
          chartType: 'bar', // Default
          recommendation: 'Consider reviewing this data further for additional insights.'
        };
      }
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      responseJSON = {
        text: message.content[0].text,
        chartType: 'bar',
        recommendation: 'Consider reviewing this data further for additional insights.'
      };
    }

    // Return the response
    res.status(200).json(responseJSON);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({ 
      error: 'Error generating insights',
      text: "I encountered an error analyzing your data. This could be due to unexpected data formats or API limitations.",
      chartType: null,
      recommendation: "Try a more specific question or check that your data is properly formatted."
    });
  }
}

// Function to process data flexibly
function processDataFlexibly(data) {
  // If data is already in the expected format, use it
  if (data.rawData || data.billableHoursData || data.practiceAreaData) {
    return data;
  }
  
  // If data is an array, it's probably the raw CSV data
  if (Array.isArray(data)) {
    const result = {
      rawData: data.slice(0, 50) // Limit to first 50 rows to save tokens
    };
    
    // Try to identify data types and organize into appropriate categories
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      
      // Examine column names to identify data types
      const timeColumns = columns.filter(c => /hours?|time|duration|billed?/i.test(c));
      const peopleColumns = columns.filter(c => /attorney|lawyer|name|user|employee/i.test(c));
      const areaColumns = columns.filter(c => /practice|area|type|category|matter/i.test(c));
      const moneyColumns = columns.filter(c => /amount|fee|revenue|cost|price|profit/i.test(c));
      
      // Include column identification information
      result.identifiedColumns = {
        timeColumns,
        peopleColumns,
        areaColumns,
        moneyColumns,
        allColumns: columns
      };
      
      // Include a sample row to show the data structure
      result.sampleRow = data[0];
    }
    
    return result;
  }
  
  // If it's an object but doesn't match expected format, return it as is
  return data;
}

// Function to create an enhanced prompt based on the data structure
function createEnhancedPrompt(prompt, data) {
  let enhancedPrompt = prompt;
  
  // Add information about the data structure
  if (data.identifiedColumns) {
    const { timeColumns, peopleColumns, areaColumns, moneyColumns, allColumns } = data.identifiedColumns;
    
    enhancedPrompt += `\n\nI'm analyzing legal practice data with these columns: ${allColumns.join(', ')}`;
    
    if (timeColumns.length > 0) {
      enhancedPrompt += `\nTime-related columns: ${timeColumns.join(', ')}`;
    }
    
    if (peopleColumns.length > 0) {
      enhancedPrompt += `\nPeople-related columns: ${peopleColumns.join(', ')}`;
    }
    
    if (areaColumns.length > 0) {
      enhancedPrompt += `\nPractice area/category columns: ${areaColumns.join(', ')}`;
    }
    
    if (moneyColumns.length > 0) {
      enhancedPrompt += `\nFinancial columns: ${moneyColumns.join(', ')}`;
    }
    
    if (data.sampleRow) {
      enhancedPrompt += `\n\nHere's a sample row to understand the data format:\n${JSON.stringify(data.sampleRow, null, 2)}`;
    }
  }
  
  return enhancedPrompt;
}
