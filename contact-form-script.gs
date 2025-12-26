// Google Apps Script for ABC Digital Contact Form
// Deploy as Web App with Execute as: Me, Access: Anyone

function doPost(e) {
  try {
    // Get form data
    const formData = e.parameter;
    
    // Open spreadsheet (replace with your spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([
        ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Project Type', 'Message']
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }
    
    // Add new row with form data
    sheet.appendRow([
      new Date(),
      formData.name || '',
      formData.email || '',
      formData.phone || '',
      formData.company || '',
      formData.service || '',
      formData['project-type'] || '',
      formData.message || ''
    ]);
    
    // Send email notification (optional)
    sendEmailNotification(formData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Form submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(formData) {
  const subject = 'New Contact Form Submission - ABC Digital';
  const body = `
New contact form submission received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Service: ${formData.service}
Project Type: ${formData['project-type']}
Message: ${formData.message}

Submitted at: ${new Date()}
  `;
  
  // Replace with your email
  const emailTo = 'info@abcdigital.com';
  
  MailApp.sendEmail(emailTo, subject, body);
}

// Test function
function doGet() {
  return HtmlService.createHtmlOutput('Contact form script is running');
}